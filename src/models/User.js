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
        required: false,
        trim: true,
        match: [
            /^(\+213|0)(5|6|7)\d{8}$/, // Algerian phone numbers: +213 followed by 9 digits or 0 followed by 9 digits
            'Please enter a valid Algerian phone number (e.g., +2135XXXXXXX or 0XXXXXXXXX)'
        ],
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: Date.now, // Set to current date by default
    },
    failedLoginAttempts: {
        type: Number,
        default: 0,
    },
    lockUntil: {
        type: Date,
        default: null,
    },
    isLocked: {
        type: Boolean,
        default: false,
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

// Check if user account is locked
userSchema.methods.isAccountLocked = function() {
    // Check if the account is locked and whether the lock period has expired
    return this.isLocked && (this.lockUntil > Date.now());
};

// Increment failed login attempts
userSchema.methods.incLoginAttempts = function() {
    // Increment the number of failed attempts and set lockUntil if necessary
    let updates = {
        $inc: { failedLoginAttempts: 1 },
    };

    // Lock the account if the number of failed attempts exceeds a limit
    if (this.failedLoginAttempts + 1 >= 10) {
        updates.$set = {
            isLocked: true,
            lockUntil: Date.now() + 2 * 60 * 60 * 1000 // Lock account for 2 hours
        };
    }

    return this.updateOne(updates);
};

// Reset failed login attempts and update lastLogin
userSchema.methods.resetLoginAttempts = async function() {
    this.failedLoginAttempts = 0;
    this.lockUntil = null;
    this.isLocked = false;
    this.lastLogin = Date.now(); // Update lastLogin to current date
    await this.save();
};

module.exports = mongoose.model('User', userSchema);
