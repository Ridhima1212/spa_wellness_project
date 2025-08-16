// src/models/service.model.js
const dbPool = require('../../config/database');

// Get all services from DB
const getAll = () => {
    const SQLQuery = 'SELECT * FROM services';
    return dbPool.query(SQLQuery);
};

// Get a single service by its ID
const getById = (id) => {
    const SQLQuery = 'SELECT * FROM services WHERE id = ?';
    return dbPool.query(SQLQuery, [id]);
};

// Create a new service in DB
const createNew = (body) => {
    const { name, description, price, duration_minutes } = body;
    const SQLQuery = 'INSERT INTO services (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)';
    return dbPool.query(SQLQuery, [name, description, price, duration_minutes]);
};

module.exports = {
    getAll,
    getById,
    createNew,
};