const express = require("express");

const router = express.Router();
const userApi = require("./userApi");
const postApi = require("./postApi");

router.use("/users", userApi);
router.use("/posts", postApi);

module.exports = router;
