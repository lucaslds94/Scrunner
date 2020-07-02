require("dotenv").config({
  path: ".env",
});

const nodemailer = require("nodemailer");

const email = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

module.exports = email;
