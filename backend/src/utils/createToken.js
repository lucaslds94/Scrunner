const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

module.exports = {
  createToken: (userId) => {
    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });
    return token;
  },
};
