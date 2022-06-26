const passport = require("passport");
const { User } = require("../models");
const local = require("./local");
module.exports = () => {
  // return req.login(user ... ) 시,
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

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
};
