// controllers/authController.js
const User = require('../models/User');

const register_new_client = async (req, res) => {
    const { username, email, password, phone } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Create a new user with the role 'client'
        const newUser = new User({ username, email, password, phone, role: 'client' });
        await newUser.save();

        // Optionally, handle Passport login or session here

        return res.status(201).json({ 
            message: 'User registered successfully', 
            user: { 
                username: newUser.username,
                email: newUser.email, 
                phone: newUser.phone, 
                role: newUser.role 
            } 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

module.exports = { register_new_client };
