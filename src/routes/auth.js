const router = require('express').Router()
const passport = require('passport');
const {register_new_client }  = require("../controllers/auth");
const otpController = require('../controllers/otp');
router.post('/register', register_new_client);

router.post('/login', 
    passport.authenticate('local'), 
    (req, res) => {
      res.send({ message: 'Login successful', user: req.user });
    }
  );
router.post('/send-otp', otpController.sendOTP);

module.exports = router