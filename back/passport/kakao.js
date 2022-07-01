require("dotenv/config");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: KakaoStrategy } = require("passport-kakao");
const { User } = require("../models");
const { Op } = require("sequelize");
const { REG_PHONE } = require("../utils/reg");

module.exports = () => {
  let criteria;
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/oauth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        //accessToken , refreshToken => oauth2 공부해 볼 것!!!
        console.log("kakao profile", profile);

        try {
          const existingUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });

          if (existingUser) {
            return done(null, existingUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account.email,
              name: profile.username,
              nickname: profile.displayName,
              avartar: profile._json && profile._json.properties.profile_image,
              birth: profile._json && profile._json.kakao_account.birthday,
              snsId: profile.id,
              provider: "kakao",
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
