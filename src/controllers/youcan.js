const axios = require('axios');
const FormData = require('form-data');
const  YouCanAccount  = require('../models/youcan-account'); // Import the YouCanAccount model
const {checkout_fields} = require("../enums/checkout_fields")


// fucntions to use 
async function loginYoucan(email, password) {
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
function transformOrders(rawOrders) {
  // Transform the rawOrders into the desired format
  const transformedOrders = rawOrders.map(order => ({
    id: order.id,
    ref: order.ref,
    creationDate: new Date(order.created_at).toISOString().split('T')[0], 
    paymentStatus: order.payment_status_new ?? 'Unknown', 
    shippingStatus: order.shipping?.status_text ?? 'Not available', 
    product: {
      link: order.variants[0]?.extra_fields?.referer_url ?? 'No link available', 
      name: order.variants[0]?.variant?.product?.name ?? 'No name available', 
      imageLink: order.variants[0]?.variant?.product?.thumbnail ?? 'No image available' 
    },
    customer: {
      id: order.customer.id,
      fullName: order.customer.full_name.trim() || 'Anonymous',
      email: order.customer.email || 'No email provided',
      phone: order.customer.phone || 'No phone provided',
      avatar: order.customer.avatar || 'No avatar available',
      country: order.customer.country || 'No country specified',
      createdAt: new Date(order.customer.created_at).toISOString().split('T')[0], // Only date
    },
    total: order.total ? order.total.toFixed(2) : '0.00' 
  }));
  
  
  return {
    orders: transformedOrders 
  };
}

// actual controllers 
const request_youcan_token = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Call the login function to get the token
      const token = await loginYoucan(email, password);
  
      // Check if an entry already exists for the user
      const existingAccount = await YouCanAccount.findOne({ userId: req.user.id });
  
      if (existingAccount) {
        // Update the existing record with the new token if needed
        existingAccount.email = email;
        existingAccount.token = token;
  
        // Optionally, you may choose to hash the password before saving
        existingAccount.password = password; // Consider hashing the password before storing
  
        await existingAccount.save(); // Save the updated document to the database
  
        return res.status(200).json({ message: 'Token updated successfully.' });
      } else {
        // Create a new record if none exists
        const youCanAccount = new YouCanAccount({
          userId: req.user.id, // Associating with the logged-in user
          email,
          password, // Consider hashing the password before storing
          token,
        });
  
        await youCanAccount.save(); // Save the document to the database
  
        return res.status(200).json({ message: 'Login successful and token saved.' });
      }
    } catch (error) {
      // Handle errors with more specific messages and logging
      console.error("Error during YouCan login:", error);
  
      return res.status(500).json({
        message: 'Error during login and saving token',
        error: error.message || 'An unexpected error occurred.',
      });
    }
};
const get_youcan_stores = async (req, res) => {
  try {
    // Log the token for debugging
    console.log("This is the auth token:", req.authToken);

    // Make the Axios request
    const response = await axios.get('https://api.youcan.shop/stores', {
      headers: {
        Authorization: `Bearer ${req.authToken}`,
      },
    });

    // Return the response data
    return res.status(200).json(response.data);
  } catch (error) {
    // Log the error details for debugging
    console.error("Error fetching stores:", {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : 'No response data',
      request: {
        method: error.config.method,
        url: error.config.url,
        headers: error.config.headers,
        data: error.config.data,
      }
    });

    // Send a detailed error response to the client
    return res.status(error.response ? error.response.status : 500).json({
      message: 'Error fetching stores',
      error: error.response ? error.response.data : 'An unexpected error occurred.',
    });
  }
};
const get_youcan_orders = async (req, res) => {
   
  try {
      // Fetch orders from external API
      const apiResponse = await axios.get('https://api.youcan.shop/orders?include=customer', {
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
}
const get_youcan_one_order = async (req, res) => {
   
  try {
      // Fetch orders from external API
      const apiResponse = await axios.get(`https://api.youcan.shop/orders/${req.params.id}`, {
          headers: {
              Authorization: `Bearer ${req.authToken}`, // Include the token in the Authorization header
          },
      });

      // Send the transformed data as response
      res.status(200).json(apiResponse.data);

  } catch (error) {
      // Error handling
      const statusCode = error.response ? error.response.status : 500;
      const errorMessage = error.response ? error.response.data : error.message;

      res.status(statusCode).json({
          message: 'Error fetching orders',
          error: errorMessage,
      });
  }
}
const update_youcan_checkout = async (req, res) => {
  try {
      // Fetch orders from external API
      console.log(req.authToken);
      const apiResponse = await axios.put('https://api.youcan.shop/settings/checkout/fields', {
          headers: {
              Authorization: `Bearer ${req.authToken}`,
          },
          body : checkout_fields
      });


      // Send the transformed data as response
      res.status(200).json(apiResponse);

  } catch (error) {
      // Error handling
      const statusCode = error.response ? error.response.status : 500;
      const errorMessage = error.response ? error.response.data : error.message;

      res.status(statusCode).json({
          message: 'Error updating the checkout fields for your Youcan store',
          error: errorMessage,
      });
  }
}

module.exports = {
  request_youcan_token ,
  get_youcan_stores ,
  get_youcan_orders , 
  update_youcan_checkout ,
  get_youcan_one_order ,
  }