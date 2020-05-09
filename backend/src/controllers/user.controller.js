const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email, password, name, is_owner } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, password, name, is_owner });
      return res.json(user);
    }

    return res.status(409).json({ error: "Email is already in use" });
  },

  async delete(req, res) {
    const { id } = req.params;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy({
      where: {
        id,
      },
    });

    return res.status(204).send();
  },
};
