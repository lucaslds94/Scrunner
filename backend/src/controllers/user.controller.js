const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    let { email, password, name, is_owner } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      password = bcrypt.hashSync(password, 10);

      user = await User.create({ email, password, name, is_owner });

      delete user.dataValues.password;

      return res.json(user.dataValues);
    }

    return res.status(409).json({ err: "Email is already in use" });
  },

  async delete(req, res) {
    const { id } = req.params;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(409).json({ err: "User not found" });
    }

    await user.destroy({
      where: {
        id,
      },
    });

    return res.status(204).send();
  },
};
