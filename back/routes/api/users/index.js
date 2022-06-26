const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, AuthToken, Post } = require("../../../models"); // db.User, db.AuthToken

const router = express.Router();

// 로그인 유저
router.get("/me", (req, res, next) => {
  console.log(req.user);
  return res.json(req.user || false);
});

// 유저 생성
router.post("/", async (req, res, next) => {
  const { auth, name, nickname, password } = req.body;
  let email = null;
  let phone = null;
  if (auth.indexOf("@") > -1) {
    email = auth;
  } else {
    phone = auth;
  }

  req.session.prepUser = { email, phone, name, nickname, password };

  try {
    const existingUser = await User.findOne({ where: { nickname } });
    if (existingUser) {
      return res.status(403).send("이미 사용중인 닉네임입니다."); //403 - 클라이언트 오류 & 금지
    }
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const authToken = await AuthToken.create({ payload });
    console.log(authToken);
    return res.status(200).json({ email, phone, nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 유저 이메일, 전화번호 인증
router.post("/confirm", async (req, res, next) => {
  const { payload } = req.body;
  const { email, phone, name, nickname, password } = req.session.prepUser;

  try {
    const exists = await AuthToken.findOne({ where: { payload } });
    if (!exists) {
      return res.status(403).send(false);
    }

    // 인증 성공 시 유저 생성 ->
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      phone,
      name,
      nickname,
      password: hashedPassword,
    });
    return res.status(201).send("ok"); // 200 - 성공, 201 - 생성
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // 서버 에러
    if (err) {
      console.error(err);
      return next(err);
    }
    // 클라이언트 에러
    if (info) {
      return res.status(401).send(info.reason); // 401 - 허가되지 않음
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followers",
          },
          {
            model: User,
            as: "Followings",
          },
        ],
      });

      // console.log(fullUserWithoutPassword);
      return res.status(200).json(fullUserWithoutPassword); // 성공 시 사용자 정보 넘겨주기.
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    req.session.destroy();
    return res.status(200).send("ok");
  });
});

module.exports = router;
