const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    let { email, password, name, is_owner } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      
      const defaultImages = [
        "noimage1.svg",
        "noimage2.svg",
        "noimage3.svg",
        "noimage4.svg",
      ];
      
      const randomIndex = Math.round(Math.random() * defaultImages.length - 1);
      
      password = bcrypt.hashSync(password, 10);

      user = await User.create({
        email,
        password,
        name,
        image: defaultImages[randomIndex],
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

  async update(req, res) {
    const { userId } = req.params;
    let { name, oldPassword, password } = req.body;
    const image = req.file.filename;

    const user = await User.findByPk(userId);

    const comparedPass = bcrypt.compareSync(oldPassword, user.password);

    if (comparedPass) {
      password = bcrypt.hashSync(password, 10);

      await User.update(
        {
          name,
          password,
          image,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      return res.status(204).send();
    }

    return res.status(401).json({ err: "Incorrect password " });
  },
};
