const bcrypt = require("bcrypt");
const User = require("../models/User");

const { jwt } = require("../config/auth");
const { verify, decode } = require("jsonwebtoken");

const { createToken } = require("../utils/createToken");
const { serializedObject } = require("../utils/serializedImage");
const { sendEmail } = require("../utils/sendEmail");

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
        is_active: false,
      });

      try {
        if (process.env.NODE_ENV !== "test") {
          sendEmail(user.dataValues);
        }

        delete user.dataValues.password;

        return res.json(user.dataValues);
      } catch (error) {
        return res.status(500).json({ err: "Error sending the e-mail" });
      }
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
        if (image) {
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

  async validate(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ err: "JWT token is missing" });
    }

    const [, token] = authHeader.split(" ");

    try {
      verify(token, jwt.secret);

      let { sub } = decode(token);

      sub = JSON.parse(sub);

      let user = await User.findOne({
        where: {
          id: sub.id,
        },
        raw: true,
      });

      if (!user) {
        return res.status(400).json({ err: "User not found" });
      }

      if (user.is_active) {
        return res.status(412).json({ err: "Account already active" });
      }

      user = await User.update(
        {
          is_active: true,
        },
        {
          where: {
            id: sub.id,
          },
        }
      );

      return res.status(204).send();
    } catch {
      return res.status(401).json({ err: "Invalid JWT token" });
    }
  },
};
