const express = require("express");

const router = express.Router();

// 내 정보 불러오기
router.get("/me", (req, res) => {
  return res.json({ success: true });
});

// 로그인
router.post("/login", (req, res) => {
  return res.json(true);
});

// 로그아웃
router.post("/logout", (req, res) => {
  return res.json(true);
});

module.exports = router;
