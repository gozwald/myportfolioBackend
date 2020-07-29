var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

// const whitelist = ["https://gallant-curie-314d7c.netlify.app/"];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

router.post("/", function (req, res, next) {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    replyTo: email,
    subject: "New Message from " + name,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json("bad work sir");
    } else {
      console.log("Email sent: " + info.response);
      res.json("nice work sir");
    }
  });
});

module.exports = router;
