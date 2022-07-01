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
const { isLoggedIn } = require("../../middlewares");
const router = express.Router();
const { Op } = require("sequelize");
// lastId + pagination(infinite-scrolling)

// 포스트 전체 보기(explore)
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      // where: { id: lastId },
      offset: 0,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      attributes: { exclude: ["UserId"] },
      include: [
        { model: Image },
        { model: Video },
        { model: Hashtag },
        { model: User, attributes: ["id", "nickname"] },
        { model: Mention },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 포스트 부분(followers) 보기(home)
router.get("/followings", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: { model: User, as: "Followings", attributes: ["id"] },
    });

    console.log(user);
    const posts = await Post.findAll({
      where: { UserId: { [Op.in]: user.Followings.map((v) => v.id) } },
      offset: 0,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      attributes: { exclude: ["UserId"] },
      include: [
        { model: Image },
        { model: Video },
        { model: Hashtag },
        { model: User, attributes: ["id", "nickname"] },
        { model: Mention },
        { model: Comment, include: [{ model: User }] },
      ],
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
