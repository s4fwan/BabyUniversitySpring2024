const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const welcomeEmailText = require("../utils/WelcomeEmailText");
const hashPin = require("../utils/HashPin");
const OTP = require("../models/OTP");
const { verifyOTP } = require("../utils/OTPService");

router.post("/sign-up", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "baby.university09@gmail.com",
      pass: "majbsqfzgpgzbuaq",
    },
  });
  const { username, pin } = req.body;
  const email = req.body.email.toLowerCase();

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newHashPin = await hashPin(pin);
    user = new User({
      email,
      username,
      pin: newHashPin,
    });
    await user.save();
    const mailOptions = {
      from: "Baby University",
      to: email,
      subject:
        "Welcome to Baby University! Let’s Explore Quantum Physics for Children!",
      text: welcomeEmailText(username),
    };
    transporter.sendMail(mailOptions);
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      userEmail: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/sign-in", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const { pin } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or pin" });
    }
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or pin" });
    }
    res.status(200).json({
      message: "User signed in successfully",
      userId: user._id,
      userEmail: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/change-pin", async (req, res) => {
  const { userId, oldPin, newPin } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(oldPin, user.pin);
    if (!isMatch) {
      return res.status(400).json({ message: "Old PIN is incorrect" });
    }
    user.pin = await hashPin(newPin);
    await user.save();
    res.status(200).json({ message: "PIN updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/reset-pin", async (req, res) => {
  const { email, newPin, otp } = req.body;
  try {
    if (await verifyOTP(email, otp)) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.pin = await hashPin(newPin);
      await user.save();
      await OTP.deleteMany({ email });
      res.status(200).json({ message: "PIN reset successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
