const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid"); // 고유아이디
const mime = require("mime-types");
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 다음 미들웨어로 이동
  } else {
    res.status(401).send("로그인한 사용자만 접근 가능한 페이지");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인을 하지 않은 사용자만 접근 가능한 페이지");
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});

// filename: (req, file, cb) => {
//   const ext = path.extname(file.originalname);
//   cb(null, path.basenae(file.originalname, ext) + Date.now() + ext);
// };

exports.uploadFiles = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type."), false);
    }
  },
  limits: {
    fileSize: 1024 ** 3,
  },
});
