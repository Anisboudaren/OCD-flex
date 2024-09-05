const express = require('express');
const axios = require('axios');
const router = express.Router();
const zrController = require("../controllers/zrexpress")
const {isZrAuth} = require('../middleware/auth/authenticated')

router.post('/login', zrController.save_zr_token );

// router.post("/ship-orders" , isZrAuth , zrController.ship_orders )
router.get("/fees" , isZrAuth , zrController.get_fees)
module.exports = router