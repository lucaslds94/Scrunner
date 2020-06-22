const bcrypt = require("bcrypt");
const User = require("../models/User");

const { createToken } = require("../utils/createToken");
const { serializedObject } = require("../utils/serializedImage");

const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlink = promisify(fs.unlink);

const defaultImages = [
  "noimage1.svg",
  "noimage2.svg",
  "noimage3.svg",
  "noimage4.svg",
];

module.exports = {
  async store(req, res) {
    let { email, password, name, is_owner } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      const randomIndex = Math.round(
        Math.random() * (defaultImages.length - 1)
      );

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
    const image = req.file ? req.file.filename : false;

    let user = await User.findByPk(userId);

    const objUserToUpdate = {};

    objUserToUpdate.name = name;

    if (oldPassword.length >= 8) {
      const comparedPass = bcrypt.compareSync(oldPassword, user.password);

      if (comparedPass) {
        password = bcrypt.hashSync(password, 10);

        objUserToUpdate.password = password;
      } else {
        if(image){
          try {
            await unlink(path.resolve(__dirname, "..", "..", "uploads", image));
          } catch (error) {
            return res.status(500).json({ err: "Internal server error" });
          }
        }
        
        return res.status(401).json({ err: "Incorrect password combination" });
      }
    }

    if (image) {
      objUserToUpdate.image = image;
    }

    await User.update(objUserToUpdate, {
      where: {
        id: userId,
      },
    });

    if (!defaultImages.includes(user.image) && image) {
      try {
        await unlink(
          path.resolve(__dirname, "..", "..", "uploads", user.image)
        );
      } catch (error) {
        return res.status(500).json({ err: "Internal server error" });
      }
    }

    user = await User.findByPk(userId);

    user = serializedObject(user.dataValues);

    const token = createToken(userId);

    return res.json({ user, token });
  },
};
