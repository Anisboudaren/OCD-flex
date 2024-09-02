const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router();

async function requestToken(email, password) {
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);

    try {
        const response = await axios.post('https://api.youcan.shop/auth/login', form, {
            headers: form.getHeaders(),
        });
        return response.data.token; 
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
}


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await requestToken(email, password);

        // Set the token in an HTTP-only, secure cookie
        res.cookie('youcanToken', token, {
            httpOnly: true,
            secure: true, // Set to true in production (requires HTTPS)
            maxAge: 3600000, // 1 hour (adjust as needed)
            sameSite: 'none', // Prevent CSRF
        });
console.log(token)
        // Send a success message
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({
            message: 'Error during login',
            error: error.message,
        });
    }
});

router.get('/stores/all', async (req, res) => {
    try {
      
        const response = await axios.get('https://api.youcan.shop/stores', {
            headers: {
                Authorization: `Bearer ${req.authToken}`, // Include the token in the Authorization header
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        // Handle any errors
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error fetching stores',
            error: error.response ? error.response.data : error.message,
        });
    }
});

function transformOrders(rawOrders) {
    // Transform the rawOrders into the desired format
    const transformedOrders = rawOrders.map(order => ({
      ref: order.ref,
      creationDate: new Date(order.created_at).toISOString().split('T')[0], // Formatting date to YYYY-MM-DD
      customer: "Unknown Customer", // You'll need to map this from your raw data if available
      paymentStatus: order.payment_status_new,
      shippingStatus: order.shipping.status_text, // You'll need to map this from your raw data if available
      total: order.total.toFixed(2) // Formatting total to two decimal places
    }));
  
    // Wrap the transformed orders in the desired nested array structure
    return {
      orders: [ [ transformedOrders ] ]
    };
  }
  
  
  router.get('/orders/all', async (req, res) => {
    console.log("heelo");
    try {
        // Fetch orders from external API
        const apiResponse = await axios.get('https://api.youcan.shop/orders', {
            headers: {
                Authorization: `Bearer ${req.authToken}`, // Include the token in the Authorization header
            },
        });

        // Transform the data
        const transformedData = transformOrders(apiResponse.data.data);

        // Log the transformed data
        console.log("response data:", JSON.stringify(transformedData, null, 2));

        // Send the transformed data as response
        res.status(200).json(transformedData);

    } catch (error) {
        // Error handling
        const statusCode = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data : error.message;

        res.status(statusCode).json({
            message: 'Error fetching orders',
            error: errorMessage,
        });
    }
});

router.put('/checkout-update', async (req, res) => {
    console.log("heelo");
    try {
        // Fetch orders from external API
        const apiResponse = await axios.get('https://api.youcan.shop/settings/checkout/fields', {
            headers: {
                Authorization: `Bearer ${req.authToken}`, // Include the token in the Authorization header
            },
        });

        // Transform the data
        const transformedData = transformOrders(apiResponse.data.data);

        // Log the transformed data
        console.log("response data:", JSON.stringify(transformedData, null, 2));

        // Send the transformed data as response
        res.status(200).json(transformedData);

    } catch (error) {
        // Error handling
        const statusCode = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data : error.message;

        res.status(statusCode).json({
            message: 'Error fetching orders',
            error: errorMessage,
        });
    }
});

module.exports = router;
