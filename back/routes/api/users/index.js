const express = require("express");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const passport = require("passport");
const { User, AuthToken, Post } = require("../../../models");
const { REG_PHONE, REG_EMAIL } = require("../../../utils");

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
      return res.status(403).send(false); //403 - 클라이언트 오류 & 금지
    }
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const authToken = await AuthToken.create({ payload, nickname });
    console.log(authToken);
    return res.status(200).json({ email, phone, nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 인증 토큰 확인
router.post("/confirm", async (req, res, next) => {
  const { payload } = req.body;
  const { email, phone, name, nickname, password } = req.session.prepUser;

  try {
    const exists = await AuthToken.findOne({ where: { payload, nickname } });
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

// 인증 토큰 재전송(변경)
router.post("/confirm-token/resend", async (req, res, next) => {
  const { nickname } = req.session.prepUser;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  try {
    await AuthToken.update(
      { payload },
      {
        where: { nickname },
        // returning: true,
        // plain: true,
      }
    );

    const newToken = await AuthToken.findOne({
      where: { payload, nickname },
    });

    console.log(newToken);
    return res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 로그인
router.post("/login", (req, res, next) => {
  const { username } = req.body;
  // 재시도 시, 성공 ? login
  passport.authenticate("local", async (err, user, info) => {
    // 서버 에러
    if (err) {
      console.error(err);
      return next(err);
    }
    // 클라이언트 에러
    if (info) {
      return res.status(401).send(info.reason); // 401 - 허가되지 않음
    }

    // 여기까지 왔으면 로그인 성공한 것! => 로그인 유저 정보 반환하기.
    // 이 로직 나중에 수정할 것. -> 조건
    const allAccountsWithoutPassword = await User.findAll({
      where: { [Op.and]: [{ email: user.email }, { phone: user.phone }] },
      attributes: ["id", "nickname"],
    });

    console.log(allAccountsWithoutPassword);
    const allTargetUserWithoutPassword = await User.findOne({
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

    const condition =
      allAccountsWithoutPassword.length > 1 &&
      (REG_PHONE.test(username) || REG_EMAIL.test(username));

    if (condition) {
      return res.status(200).send(allAccountsWithoutPassword);
    }

    return req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const result = {
        user: allTargetUserWithoutPassword,
        accounts: allAccountsWithoutPassword.filter(
          (v) => v.id !== allTargetUserWithoutPassword.id
        ),
      };

      console.log(result);
      return res.status(200).send(result);
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
