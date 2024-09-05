// controllers/authController.js
const User = require('../models/User');
const OTP = require('../models/otpSchema')
const register_new_client = async (req, res) => {
    try {
    const { username , email, phone , password, otp } = req.body;
    // Check if all details are provided
    if (!username || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }

    const newUser = await User.create({
      username,
      email,
      phone ,
      password,
    });
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = { register_new_client  };
