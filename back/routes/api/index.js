const express = require("express");
const users = require("./users");
const posts = require("./posts");
const directs = require("./directs");
const router = express.Router();

router.use("/users", users);
router.use("/posts", posts);
router.use("/directs", directs);

module.exports = router;
