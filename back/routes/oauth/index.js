const express = require("express");
const passport = require("passport");
const router = express.Router();

// 카카오 버튼 누르면
router.get("/kakao", passport.authenticate("kakao"));

// 카카오 로그인 페이지 등장 & 거기서 로그인 버튼을 누르면
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }), // 실패하면
  // 성공하면
  async (req, res, next) => {
    return res.redirect("http://localhost:3090/");
  }
);

module.exports = router;
