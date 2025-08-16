// src/controllers/users.controller.js
const User = require('../models/user.model');

const getUserProfile = async (req, res) => {
    // The user's info is attached to req.user by the protect middleware
    const user = await User.findByEmail(req.user.email);

    if (user) {
        res.json({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { getUserProfile };