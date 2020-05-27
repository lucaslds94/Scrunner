const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    let { email, password, name, is_owner } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      password = bcrypt.hashSync(password, 10);

      user = await User.create({
        email,
        password,
        name,
        is_owner,
        is_active: true,
      });

      delete user.dataValues.password;

      return res.json(user.dataValues);
    }

    return res.status(409).json({ err: "Email is already in use" });
  },

  async disable(req, res) {
    const { userId } = req.params;

    await User.update(
      {
        is_active: false,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    return res.status(204).send();
  },
};
