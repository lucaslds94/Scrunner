const bcrypt = require("bcrypt");
const User = require("../models/User");

const { createToken } = require("../utils/createToken");
const { serializedObject } = require("../utils/serializedImage");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    
    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    if (!user.is_active) {
      return res.status(403).json({ err: "Disabled account" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res
        .status(401)
        .json({ err: "Incorrect email/password combination" });
    }

    delete user.dataValues.password;

    user = serializedObject(user.dataValues);

    const token = createToken(user.id);

    return res.json({ user, token });
  },
};
