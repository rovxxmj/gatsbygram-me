const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // (id) req.body.email
        passwordField: "password", // (pw) req.body.password
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });

          if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
              return done(null, user);
            } else {
              return done(null, false, { reason: "비밀번호가 틀렸습니다." });
            }
          } else {
            return done(null, false, { reason: "존재하지 않는 이메일입니다." });
          }
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
