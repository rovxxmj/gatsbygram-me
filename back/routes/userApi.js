const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

// 회원가입
router.post("/", isNotLoggedIn, async (req, res, next) => {
  const { email, name, nickname, password } = req.body;

  try {
    const exUser = await User.findOne({ where: { email: req.body.email } });
    // 403 - 클라이언트 에러
    if (exUser) return res.status(403).send("이미 사용 중인 사용자입니다.");

    const hashedPw = await bcrypt.hash(password, 12);
    await User.create({
      email,
      name,
      nickname,
      password: hashedPw,
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
// 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    // 서버 에러
    if (authError) {
      console.error(authError);
      next(authError);
    }
    // 클라이언트 에러, 401 - 허가되지 않음, 403 - 금지
    if (info) {
      return res.status(401).send(info.reason);
    }

    // 성공 객체(사용자 객체) -> serializeUser 로 이동!
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPw = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ["password"] },
        include: [
          { model: Post },
          { model: User, as: "Followings" },
          { model: User, as: "Followers" },
        ],
      });

      // 세션 쿠키를 브라우저에 전송
      return res.status(200).json(fullUserWithoutPw);
    });
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  return res.send("ok");
});

module.exports = router;
