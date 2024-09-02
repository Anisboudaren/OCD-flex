const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Normally you'd hash the password
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
