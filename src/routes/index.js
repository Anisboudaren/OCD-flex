const express = require('express');
const youcanRouter = require('./youcan.js')
const authRoutes = require("./auth.js")
const profileRouter = require("./user.js")

const {isAuth, isYoucanAuth} = require("../middleware/auth/authenticated.js")
const zrexpress = require('./zrexpress.js')
const router = express.Router();


router.use('/auth', authRoutes);  
router.use('/profile' , profileRouter)
router.use('/youcan' , isAuth , youcanRouter)
router.use('/zr' , zrexpress)

module.exports = router;
