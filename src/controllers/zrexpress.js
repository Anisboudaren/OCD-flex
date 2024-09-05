const axios = require('axios');
const FormData = require('form-data');
const  YouCanAccount  = require('../models/youcan-account'); // Import the YouCanAccount model
const {checkout_fields} = require("../enums/checkout_fields");
const zrAccount = require('../models/zr-account');


// fucntions to use 
async function test_connection(token, key) {
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    try {
        const response = await axios.get('https://procolis.com/api_v1/token', null , {
            headers: {
                'token' : token , 
                'key' : key 
            },
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
    total: order.total ? order.total.toFixed(2) : '0.00' 
  }));
  
  return {
    orders: transformedOrders 
  };
}

// actual controllers 
const save_zr_token = async (req, res) => {
    const { token, key } = req.body;
  
    try {
      // test is the token is working
  
      // Check if an entry already exists for the user
      const existingAccount = await zrAccount.findOne({ userId: req.user.id });
  
      if (existingAccount) {
        // Update the existing record with the new token if needed
        existingAccount.token = token;
        existingAccount.key = key;
        await existingAccount.save(); 
  
        return res.status(200).json({ message: 'Token updated successfully.' });
      } else {
        // Create a new record if none exists
        const youCanAccount = new zrAccount({
          userId: req.user.id, // Associating with the logged-in user
          token,
          key, // Consider hashing the password before storing
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

const ship_orders = async (req , res ) => {
    const colis = []
    const orders = req.orders ; 
    orders.map((coli) => {

    })
}


const get_fees = async ( req , res) => {
    try {
        const response = await axios.post('https://procolis.com/api_v1/tarification', 
            {
                "Colis" : [
                 
                ]
               }
            , {
            headers: {
                'token' : req.token , 
                'key' : req.key 
            },
           
        });
        return res.json({ message: 'request successful.'  , fees : response.data});
    }catch (error) {
        res.send(error.response ? error.response.data : error.message);
    }
}

const provide_shipping_fees  = async ( req , res) => {
    try {
        const response = await axios.post('https://procolis.com/api_v1/tarification', 
            {
                "Colis" : [
                ]
               }
            , {
            headers: {
                'token' : req.token , 
                'key' : req.key 
            },
           
        });
        return res.json({ message: 'request successful.'  , fees : response.data});
    }catch (error) {
        res.send(error.response ? error.response.data : error.message);
    }
}


module.exports = {
  save_zr_token ,
  get_fees
  }