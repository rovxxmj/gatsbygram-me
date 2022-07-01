const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const { Op } = require("sequelize");
const { REG_PHONE } = require("../utils/reg");
module.exports = () => {
  let criteria;

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username", // req.body.username
        passwordField: "password", // req.body.password
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        if (username.indexOf("@") !== -1) {
          criteria = {
            email: username,
          };
        } else if (REG_PHONE.test(username)) {
          criteria = {
            phone: username,
          };
        } else {
          criteria = {
            nickname: username,
          };
        }

        try {
          const user = await User.findOne({
            where: {
              ...criteria,
              provider: "local",
            },
          });
          if (!user) {
            return done(null, false, { reason: "unExist" }); // (서버 에러, 성공, 클라이언트 에러)
          }

          const match = await bcrypt.compare(password, user.password);
          const instead = password === user.password;
          if (!match && !instead) {
            return done(null, false, { reason: "unMatch" });
          }
          return done(null, user); // 성공 시 사용자 정보 넘겨주기.
        } catch (error) {
          console.error("❌ Server error", error);
          return done(error); // 서버 에러
        }
      }
    )
  );
};
