const OTP = require("../models/OTP");

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const createOTP = async (email) => {
  await OTP.deleteMany({ email });
  const expiry = new Date(Date.now() + 5 * 60 * 1000);
  const otp = generateCode();
  const newCode = new OTP({ otp, expiry, email });
  await newCode.save();
  return otp;
};

const validateOTP = async (email, code) => {
  const existingCode = await OTP.findOne({ email, code });
  if (!existingCode) {
    return { success: false, message: "Invalid or already used code" };
  }
  const currentTime = new Date();
  if (currentTime > existingCode.expiredTime) {
    await OTP.deleteMany({ email, _id: { $ne: existingCode._id } });
    return { success: false, message: "Code expired" };
  }
  await OTP.deleteMany({ email, _id: { $ne: existingCode._id } });
  return { success: true, message: "Code is valid" };
};

const verifyOTP = async (email, otp) => {
  const existingCode = await OTP.findOne({ email, otp });
  if (!existingCode) {
    return false;
  }
  const currentTime = new Date();
  if (currentTime > existingCode.expiredTime) {
    return false;
  }
  return true ;
}

module.exports = { createOTP, validateOTP, verifyOTP };
