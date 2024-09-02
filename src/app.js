// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const CookieParser = require("cookie-parser")
const cors = require('cors')
const extractToken = require("./middleware/extractToken")
const morgan = require("morgan")
const app = express();

require('dotenv').config()
app.use(express.json());
app.use(cors({
    origin : ["http://localhost:3000"] , 
    credentials : true ,
}  
));
app.use(CookieParser())
app.use(extractToken)
app.use(morgan('tiny'));
app.use('/api', routes);

// Error handling middleware
// app.use(errorHandler);

module.exports = app;
