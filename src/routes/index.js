const express = require('express');
const youcanRoutes = require('./youcanRoutes')
const router = express.Router();


// router.use('/auth', authRoutes);  
router.use('/youcan' , youcanRoutes)


module.exports = router;
