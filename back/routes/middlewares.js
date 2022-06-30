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
