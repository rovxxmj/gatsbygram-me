const express = require("express");
const {
  Post,
  Comment,
  Image,
  Video,
  Hashtag,
  User,
  Mention,
} = require("../../../models");
const { isLoggedIn } = require("../../middlewares");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { data } = useSWR("/api/user/me", fetcher);
  try {
    const post = await Post.create({
      content: req.body.content,
      location: null,
      hideCounts: req.body.hideCounts || false,
      turnOffComments: req.body.turnOffComments || false,
      UserId: 1,
    });

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
