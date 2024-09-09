const router = require('express').Router()
const authController  = require("../controllers/auth");
const otpController = require('../controllers/otp');

//pre login 
router.post("/checker" , authController.register_checker)
router.post('/send-otp', otpController.sendOTP);
router.post('/register', authController.register_new_client);
router.post('/reset-password', authController.requestPasswordReset);
router.post('/reset-password', authController.requestPasswordReset);
router.post('/reset-password/:token', authController.resetPassword);


//post login
router.post('/login' , authController.login_client);
router.post('/logout', authController.logout_client);
  


module.exports = router