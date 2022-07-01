require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const hpp = require("hpp");
// const helmet = require("helmet");
const passport = require("passport");
const passportConfig = require("./passport");

const apiRouter = require("./routes/api");
const oauthRouter = require("./routes/oauth");

const db = require("./models");
const app = express();
app.set("PORT", process.env.PORT || 3095);

db.sequelize
  .sync({ force: false })
  .then(() => console.log("✅ DB 연결 성공!!"))
  .catch((error) => console.error(error));

passportConfig();
app.use(cors({ origin: "http://localhost:3090", credentials: true })); // 브라우저(3090) = 프론트 서버(3090) -> 백엔드 서버(3095) 포트(도메인) 일치시키기
// credential - 쿠키 전달
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
  },
};

// if (prod) {
//   sessionOption.cookie.secure = true;
//   sessionOption.cookie.proxy = true;
// }

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
app.use("/oauth", oauthRouter);
app.use("/api", apiRouter);

// 에러 페이지
app.use((err, req, res, next) => {
  return res.send("에러페이지");
});

app.listen(app.get("PORT"), () =>
  console.log(`✅ Server is listening on port ${app.get("PORT")}`)
);
