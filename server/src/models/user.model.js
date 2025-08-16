// src/models/user.model.js
const dbPool = require('../../config/database');
const bcrypt = require('bcryptjs');

// Find a user by their email address
const findByEmail = async (email) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await dbPool.query(SQLQuery, [email]);
    return rows[0]; // Return the first user found or undefined
};

// Create a new user with a hashed password
const createNew = async (body) => {
    const { full_name, email, password } = body;

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const SQLQuery = 'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)';
    const [result] = await dbPool.query(SQLQuery, [full_name, email, hashedPassword]);
    return result;
};

module.exports = {
    findByEmail,
    createNew,
};