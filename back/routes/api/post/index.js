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
        { model: User },
        { model: Mention },
        { model: Comment },
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
      where: { id: req.params.postId },
    });

    if (!existingPost) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:postId/comment/:commentId", async (req, res, next) => {
  return res.status(200).send("ok");
});

module.exports = router;
