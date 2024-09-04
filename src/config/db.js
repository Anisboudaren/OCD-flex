// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async (retries = 5, delay = 5000) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);

        if (retries > 0) {
            console.log(`Retrying connection in ${delay / 1000} seconds... (${retries} retries left)`);
            setTimeout(() => connectDB(retries - 1, delay), delay);
        } else {
            console.error('All retries exhausted. Could not connect to MongoDB.');
            process.exit(1); // Exit with failure
        }
    }
};

module.exports = connectDB;


module.exports = { connectDB };
