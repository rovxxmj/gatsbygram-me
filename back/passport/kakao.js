const passport = require("passport");
const { Strategy: KakaoStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientId: process.env.KAKAO_ID,
        callbackUrl: "/auth/kakao/callback",
      },
      // OAUTH@2
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const user = await User.findOne({
            where: { snsId: profile.id, provide: "kakao" },
          });
          if (user) {
            return done(null, user);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nickname: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
