const express = require("express");
const passport = require("passport");
const router = express.Router();
const { User, Post } = require("../models");

router.get("/", (req, res) => res.json("test"));

// 카카오 홈피로 이동
router.get("/kakao", passport.authenticate("kakao"));

// 카카오 홈피에서 로그인 성공 후,

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  (req, res) => res.send("ok")
);

module.exports = router;
