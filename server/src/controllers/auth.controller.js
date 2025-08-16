// src/controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); // <-- ADD THIS
const jwt = require('jsonwebtoken'); // <-- ADD THIS

// This is your existing register function, no changes needed here.
const register = async (req, res) => {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }

        await User.createNew(req.body);

        res.status(201).json({
            message: "User registered successfully",
            data: { full_name, email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// ADD THE NEW LOGIN FUNCTION
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // 1. Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Compare submitted password with hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. If passwords match, create a JWT
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token is valid for 1 hour
        );

        // 4. Send token back to user
        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// UPDATE YOUR EXPORTS
module.exports = {
    register,
    login, // <-- Add login here
};