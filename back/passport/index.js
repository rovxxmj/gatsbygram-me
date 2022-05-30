const passport = require("passport");
const local = require("./localStrategy");

// 여러 로그인 전략을 관리
module.exports = () => {
  passport.serializeUser(() => {});
  passport.deserializeUser(() => {});
  local();
};
