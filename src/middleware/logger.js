// src/middleware/logger.js

function logger(req, res, next) {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request Endpoint: ${req.originalUrl}`);
    next();
  }
  
  module.exports = logger;
  