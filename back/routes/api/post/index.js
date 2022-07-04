const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  Post,
  Comment,
  Image,
  Video,
  Hashtag,
  User,
  Mention,
} = require("../../../models");
const { isLoggedIn, uploadFiles } = require("../../middlewares");
const { REG_HASHTAG } = require("../../../utils/reg");
const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 1024 * 1025 * 1024 },
});

// 이미지 먼저 업로드
router.post("/img", uploadFiles.single("img"), (req, res, next) => {
  console.log(req.file);
  return res.status(200).json({ src: `img/${req.file.filename}` }); // 다음 content 포함 게시물 보낼 때 같이 보낼 것
  // return res.json(req.file.filename);
});

// 그 후 텍스트 업로드
router.post("/", isLoggedIn, uploadFiles.none(), async (req, res, next) => {
  // req.body.content
  // req.body.src
  try {
    // 포스트
    const post = await Post.create({
      content: req.body.content,
      location: null,
      hideCounts: req.body.hideCounts || false,
      turnOffComments: req.body.turnOffComments || false,
      UserId: req.user.id, // belongsTo
    });

    // 이미지
    const image = await Image.create({
      src: req.body.src,
      PostId: post.id, // belongsTo
    });

    // 해쉬태그
    const hashtags = req.body.content.match(REG_HASHTAG);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) => {
          return Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          });
        })
      );
      const postWithHashtags = await post.addHashtags(result.map((v) => v[0]));
    }

    // 맨션
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        { model: Video },
        { model: Hashtag },
        { model: User, attributes: ["id", "nickname"] },
        { model: Mention },
        { model: Comment, include: [{ model: User }] },
      ],
    });

    return res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res, next) => {
  return res.send({ id: 1 });
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const existingPost = await Post.findOne({
      where: { id: parseInt(req.params.postId) },
    });

    if (!existingPost) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    // belongsTo 하는 경우에는 대상(hasMany 의 주체)의 id를 추가적으로 작성한다!
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      attributes: { exclude: ["UserId"] },
      include: [{ model: User, attributes: ["id", "nickname"] }],
    });
    console.log(fullComment);
    return res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:postId/comment/:commentId", async (req, res, next) => {
  return res.status(200).send("ok");
});

module.exports = router;
