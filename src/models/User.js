// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false, // Set to true if phone number is mandatory
        trim: true,
        match: [
            /^(\+213|0)(5|6|7)\d{8}$/, // Algerian phone numbers: +213 followed by 9 digits or 0 followed by 9 digits
            'Please enter a valid Algerian phone number (e.g., +2135XXXXXXX or 0XXXXXXXXX)'
        ],
    },
    role: {
        type: String,
        enum: ['client', 'admin'], // Add other roles if needed
        default: 'client', // Automatically set to 'client'
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare entered password with stored hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
