const express = require("express");

const router = express.Router();
const userApi = require("./userApi");
const postApi = require("./postApi");
const authApi = require("./authApi");

router.use("/users", userApi);
router.use("/posts", postApi);
router.use("/auth", authApi);

module.exports = router;
