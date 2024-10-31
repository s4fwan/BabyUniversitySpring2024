const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
        length:6,
    },
    expiry: {
        type: Date,
        required: true,
        index: { expires: 0 }
    },

})

module.exports = mongoose.model("OTP", OTPSchema);