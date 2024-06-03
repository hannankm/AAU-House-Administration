const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.email_address,
    pass: process.env.email_password,
  },
});

module.exports = transporter;
