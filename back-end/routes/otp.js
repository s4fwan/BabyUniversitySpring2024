const express = require("express");
const router = express.Router();
const { createOTP, validateOTP } = require("../utils/OTPService");
const nodemailer = require("nodemailer");
const resetPasswordEmail = require("../utils/ResetPasswordEmail");
const User = require("../models/User");

router.post("/generate-otp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Email not found" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "baby.university09@gmail.com",
        pass: "majbsqfzgpgzbuaq",
      },
    });
    const code = await createOTP(email);
    if (code) {
      const mailOptions = {
        from: "Baby University",
        to: email,
        subject: "No Reply: One-Time Passcode (OTP) for Password Reset",
        html: resetPasswordEmail(code),
      };
      transporter.sendMail(mailOptions);
    }
    res.status(200).json({ message: "OTP has been sent to your email" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate code" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, code } = req.body;
  try {
    const result = await validateOTP(email, code);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to validate code" });
  }
});

module.exports = router;
