const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers.token;

  if (!token) {
    res.status(403).json({
      status: false,
      alert: "A Token is required for authentication",
    });
  } else {
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      res.status(401).json({
        status: false,
        alert: "Invalid Token",
      });
    }
    return next();
  }
};

module.exports = verifyToken