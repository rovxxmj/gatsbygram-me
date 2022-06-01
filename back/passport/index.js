const passport = require("passport");
const local = require("./local");
const kakao = require("./kakao");
const { User } = require("../models");

// 여러 로그인 전략을 관리
module.exports = () => {
  // 서버 세션에는 user.id 저장.
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  // 로그인 후 복원 시 아이디로 전체 정보 추출
  // app.use(passport.session(());
  // {id: 3, 'connect.sid': ...}
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      return done(null, user); // req.user
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
  kakao();
};
