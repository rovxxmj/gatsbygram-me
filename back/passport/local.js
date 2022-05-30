const passport = require("passport");
const { Strategy: Local } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");
module.exports = () => {
  passport.use(
    new Local(
      {
        usernameField: "email", // (id) email, username, phone(req.body) 으로 수정
        passwordField: "password", // (pw)
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });

          if (!user) {
            return done(null, false, { reason: "존재하지 않는 이메일입니다." }); // (서버 에러, 성공, 클라이언트 에러)
          }

          const match = await bcrypt.compare(password, user.password);

          if (!match) {
            return done(null, false, { reason: "비밀번호가 틀렸습니다." });
          }
          return done(null, user);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
