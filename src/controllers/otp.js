// controllers/otpController.js
const otpGenerator = require('otp-generator');
const User = require('../models/User');
const OTP = require('../models/otpSchema');
const { sendVerificationEmail } = require('../services/email.js'); // Move logic to a service

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'Username or email is already registered',
      });
    }

    // Generate OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Ensure OTP is unique
    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, { upperCaseAlphabets: false });
      result = await OTP.findOne({ otp });
    }

    // Save OTP to database
    const otpPayload = { email, otp };
    await OTP.create(otpPayload);

    // Send verification email
    await sendVerificationEmail(email, otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
