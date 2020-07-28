var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", function (req, res, next) {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    subject: "Invoices due",
    text: "Dudes, we really need your money",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
