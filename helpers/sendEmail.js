const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASS, META_SERVICE_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_SERVICE_EMAIL,
    pass: META_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: META_SERVICE_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
