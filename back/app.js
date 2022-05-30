require("dotenv/config");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/api");
const db = require("./models");
const app = express();
app.set("PORT", process.env.PORT || 3065);
db.sequelize
  .sync()
  .then(() => console.log("✅ DB is connected"))
  .catch(() => console.error("❌ DB connection Error"));

passportConfig();

// 브라우저와 서버의 도메인 주소가 다를 경우, 브라우저에서 차단! (cors 에러), 해결하고 싶으면 1)proxy 서버(브라우저-프론트서버-백서버)
// or 2) 브라우저/프론트서버->서버로 다이렉트 ? 서버쪽에서 접근 허용 설정 추가. res.setHeader("Access-Control-Allow-origin", "http://localhost:3000")

app.use(
  cors({
    // origin: "https://gatsbygram.com",
    origin: "*",
    credentials: true,
  })
);
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true })); // formData
app.use(cookieParser());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", apiRouter);

app.listen(app.get("PORT"), () =>
  console.log(`✅ Server is on http://localhost:${app.get("PORT")}`)
);
