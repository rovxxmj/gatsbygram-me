const express = require("express");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();
const db = require("../models");
// 회원가입
router.post("/", async (req, res, next) => {
  const { email, name, nickname, password } = req.body;

  try {
    const exist = await User.findOne({ where: { email: req.body.email } });
    // 403 - 클라이언트 에러
    if (exist) return res.status(403).send("이미 사용 중인 사용자입니다.");

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      name,
      nickname,
      password: hashedPassword,
    });
    return res.status(200).send("ok");
  } catch (err) {
    console.error(err);
    next(err); // status 500
  }
});

// 내 정보 불러오기
router.get("/", async (req, res, next) => {
  return res.json(req.user || false);
});

// 로그인
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // 서버 에러
    if (err) {
      console.error(err);
      next(err);
    }
    // 클라이언트 에러, 401 - 허가되지 않음, 403 - 금지
    if (info) {
      return res.status(401).send(info.reason);
    }

    // 성공 객체
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPw = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        include: [
          { model: db.Post },
          { model: db.User, as: "Followings" },
          { model: db.User, as: "Followers" },
        ],
      });
      console.log(fullUserWithoutPw);
      return res.status(200).json(fullUserWithoutPw);
    });
  })(req, res, next);
});

// 로그아웃
router.post("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy();
  return res.send("ok");
});

module.exports = router;
