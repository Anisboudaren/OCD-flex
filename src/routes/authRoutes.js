const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Assuming you have a User model defined in your Mongoose schema
const User = require('../models/User'); // Adjust the path to your User model

// Simple authentication route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username and password (usually you'd hash the password)
        const user = await User.findOne({ username, password });

        if (user) {
            return res.status(200).json({ message: 'Success', user });
        } else {
            return res.status(401).json({ message: 'Failure: User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error });
    }
});

module.exports = router;
