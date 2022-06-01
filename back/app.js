require("dotenv/config");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./passport");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const db = require("./models");
const app = express();
app.set("PORT", process.env.PORT || 3065);
db.sequelize
  .sync({ force: false })
  .then(() => console.log("✅ DB is connected"))
  .catch(() => console.error("❌ DB connection Error"));

passportConfig();

// 브라우저와 서버의 도메인 주소가 다를 경우, 브라우저에서 차단! (cors 에러), 해결하고 싶으면 1)proxy 서버(브라우저-프론트서버-백서버)
// or 2) 브라우저/프론트서버->서버로 다이렉트 ? 서버쪽에서 접근 허용 설정 추가. res.setHeader("Access-Control-Allow-origin", "http://localhost:3060")

app.use(cors({ origin: true, credentials: true }));

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true })); // formData
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// 사용자 확인 패스포트, 세션 쿠키 연결하기
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);
app.use("/auth", authRouter); // social auth

app.get("/", (req, res, next) => {
  res.send("백엔드 정상 동작!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Fuck!!!! 서버 에러 발생! 서버 콘솔을 확인하세요.");
});

app.listen(app.get("PORT"), () =>
  console.log(`✅ Server is on http://localhost:${app.get("PORT")}`)
);
