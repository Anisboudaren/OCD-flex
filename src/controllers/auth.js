// controllers/authController.js

const User = require('../models/User');
const OTP = require('../models/otpSchema')
const  passport  = require('passport');

const register_new_client = async (req, res, next) => {
    try {
        const { username, email, phone, password, otp } = req.body;

        // Check if all details are provided
        if (!username || !email || !password || !otp) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if user already exists by email or username
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or username',
            });
        }

        // Find the most recent OTP for the email
        const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

        // Check if OTP is valid
        if (!otpRecord || otp !== otpRecord.otp) {
            return res.status(400).json({
                success: false,
                message: 'The OTP is not valid',
            });
        }

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            phone,
            password, // Make sure to hash the password before saving it
        });

        // Log in the user directly
        req.login(newUser, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Login failed' });
            }

            // Return a success response with the logged-in user
            return res.status(201).json({
                success: true,
                message: 'User registered and logged in successfully',
                user: newUser,
            });
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

  
const register_checker = async (req, res) => {
    try {
      const { email, username } = req.body;
  
      // Check if email or username is provided
      if (!email || !username) {
        return res.status(403).json({
          success: false,
          message: 'Email and Username are required',
        });
      }
  
      // Check if user with the given email already exists
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email is already in use',
        });
      }
  
      // Check if user with the given username already exists
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: 'Username is already in use',
        });
      }
  
      // If both email and username are available
      return res.status(200).json({
        success: true,
        message: 'Email and Username are available',
      });
  
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
};

const logout_client = (req, res) => {
    req.logout(function(err) {
      if (err) {
        return res.status(500).json({ message: 'Logout failed', error: err });
      }
  
      // Destroy the session in the database
      req.session.destroy(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Failed to destroy session', error: err });
        }
  
        // Optionally, you can also clear the cookie on the client side
        res.clearCookie('connect.sid', { path: '/' }); // The cookie name may vary depending on your setup
  
        res.status(200).json({ message: 'Logout and session destruction successful' });
      });
    });
};

const login_client = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        // Handle internal errors
        return res.status(500).json({ message: 'An error occurred during login', error: err.message });
      }
  
      if (!user) {
        // Authentication failed, use the message in `info` (e.g., 'Incorrect password.')
        return res.status(401).json({ message: info.message });
      }
  
      // Log the user in if authentication was successful
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Login failed', error: err.message });
        }
  
        // Send success response with user info
        return res.status(200).json({ message: 'Login successful', user: req.user });
      });
    })(req, res, next);
  };
  

module.exports = { 
    register_new_client , 
    logout_client ,
    login_client ,
    register_checker ,

    };
