const express = require("express");
const user = require("./user");
const post = require("./post");
const posts = require("./posts");
const direct = require("./direct");
const directs = require("./directs");
const router = express.Router();

router.use("/user", user);
router.use("/post", post);
router.use("/posts", posts);
router.use("/direct", direct);
router.use("/directs", directs);

module.exports = router;
