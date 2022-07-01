const passport = require("passport");
const { User } = require("../models");
const local = require("./local");
const kakao = require("./kakao");
module.exports = () => {
  // return req.login(user ... ) 시(로그인 전)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // 로그인 후
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
  kakao();
};
