const express = require("express");
const {
  Post,
  User,
  Hashtag,
  Image,
  Mention,
  Comment,
  Video,
} = require("../../../models");
const router = express.Router();

// lastId + pagination(infinite-scrolling)

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // where: { id: lastId },
      offset: 0,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
        {
          model: Hashtag,
        },
        {
          model: Image,
        },
        {
          model: Video,
        },

        {
          model: Mention,
        },
        {
          model: Comment,
        },
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
