const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

// 여러 로그인 전략을 관리
module.exports = () => {
  // 서버 세션에는 로그인 id 만 저장.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // 나중에 복원 시 아이디로 나머지 세션 정보 추출, 로그인 후 계속 실행.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user;
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};
