const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        // List of fields you want to return, excluding `id`
        const fields = 'username email phone role createdAt lastLogin';
        
        // Find the user by ID and select only the specified fields
        const user = await User.findById(req.user.id).select(fields);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Convert user to a plain object and remove `id`
        const userObj = user.toObject();
        delete userObj._id;  // Remove `_id` field
        
        res.json(userObj);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update the logged-in user's details
const updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete the logged-in user's account
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getUser,
    updateUser,
    deleteUser,
};
