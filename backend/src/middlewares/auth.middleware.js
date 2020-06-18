const { verify } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

module.exports = {
  auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ err: "JWT token is missing" });
    }

    const [, token] = authHeader.split(" ");

    try {
      verify(token, jwt.secret);

      next();
    } catch {
      return res.status(401).json({ err: "Invalid JWT token" });
    }
  },
};
