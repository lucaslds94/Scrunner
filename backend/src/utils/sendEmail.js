const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");
const handlebars = require("handlebars");

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);

const email = require("../config/email");

module.exports = {
  sendEmail: async (user = {}) => {
    const token = sign({}, jwt.secret, {
      subject: JSON.stringify({ id: `${user.id}` }),
      expiresIn: '2d',
    });

    const replacements = {
      link: `${process.env.CLIENT_URL}/validate/${token}`,
      user_name: user.name,
    };

    const emailArchive = await readFileAsync(
      path.resolve(__dirname, "..", "assets", "email.html"),
      { encoding: "utf-8" }
    );

    const emailTemplate = handlebars.compile(emailArchive);

    const emailToSend = emailTemplate(replacements);

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: "Verificação Email - Scrunner",
      html: emailToSend,
    };

    await email.sendMail(mailOptions);
  },
};
