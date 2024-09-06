const express = require('express');
const axios = require('axios');
const router = express.Router();
const youcanController = require("../controllers/youcan")
const {isYoucanAuth, isZrAuth} = require('../middleware/auth/authenticated')


router.post('/login', youcanController.request_youcan_token );
//CRUD youcan
router.get('/stores/all', isYoucanAuth , youcanController.get_youcan_stores);
router.get('/orders/all', isYoucanAuth ,  youcanController.get_youcan_orders);
router.get('/orders/:id', isYoucanAuth ,  youcanController.get_youcan_one_order);

router.get('/checkout-update', isYoucanAuth  , youcanController.update_youcan_checkout);

module.exports = router;


