import { createTransport } from "nodemailer";
import fs from "fs";

class Email {
  constructor(user, data) {
    this.to = user.email;
    this.full_name = user.full_name;
    this.data = data;
    this.from = `OCTOM <${process.env.EMAIL_FROM}>`;
  }
}

Email.prototype.createNewTransport = function () {
  let transport = createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transport;
};

// send email via nodemailer
Email.prototype.sendEmail = async function (html, subject) {
  const mailOptions = { from: this.from, to: this.to, subject, html };
  await this.createNewTransport().sendMail(mailOptions); // Correct method: sendMail
};

// forgot password template
Email.prototype.forgotPasswordEmail = async function () {
  // fixed method name
  let template = fs.readFileSync(
    "../server/src/views/email_template/resetEmail.html",
    "utf-8"
  );
  const replacements = {
    name: this.full_name,
    resetLink: this.data.resetLink,
    otpCode: this.data.otpCode,
  };
  Object.keys(replacements).forEach((key) => {
    const value = replacements[key];
    template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
  });
  await this.sendEmail(template, `Forgot Password`);
};

export default Email;
