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
    // Ensure all fields from the form are included
    const { name, description, price, duration_minutes, image_url } = body;
    const SQLQuery = 'INSERT INTO services (name, description, price, duration_minutes, image_url) VALUES (?, ?, ?, ?, ?)';
    return dbPool.query(SQLQuery, [name, description, price, duration_minutes, image_url]);
};

// Update an existing service by its ID
const updateById = (id, body) => {
    // Ensure all fields from the form are included
    const { name, description, price, duration_minutes, image_url } = body;
    const SQLQuery = `
        UPDATE services 
        SET name = ?, description = ?, price = ?, duration_minutes = ?, image_url = ? 
        WHERE id = ?
    `;
    return dbPool.query(SQLQuery, [name, description, price, duration_minutes, image_url, id]);
};

// Delete a service by its ID
const deleteById = (id) => {
    const SQLQuery = 'DELETE FROM services WHERE id = ?';
    return dbPool.query(SQLQuery, [id]);
};

module.exports = {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById,
};
