// src/models/appointment.model.js
const dbPool = require('../../config/database');

const createNew = (userId, serviceId, appointmentDatetime) => {
    const SQLQuery = `
        INSERT INTO appointments (user_id, service_id, appointment_datetime) 
        VALUES (?, ?, ?)
    `;
    return dbPool.query(SQLQuery, [userId, serviceId, appointmentDatetime]);
};

// ADD THIS NEW FUNCTION
const findByUserId = (userId) => {
    const SQLQuery = `
        SELECT 
            a.id, 
            a.appointment_datetime, 
            a.status,
            s.name as service_name,
            s.price as service_price
        FROM appointments a
        JOIN services s ON a.service_id = s.id
        WHERE a.user_id = ?
        ORDER BY a.appointment_datetime DESC
    `;
    return dbPool.query(SQLQuery, [userId]);
};

// NEW FUNCTION to update the status of an appointment
const updateStatusById = (appointmentId, newStatus) => {
    const SQLQuery = 'UPDATE appointments SET status = ? WHERE id = ?';
    return dbPool.query(SQLQuery, [newStatus, appointmentId]);
};

// NEW FUNCTION: Get all appointments for the admin dashboard
const getAll = () => {
    const SQLQuery = `
        SELECT 
            a.id, 
            a.appointment_datetime, 
            a.status,
            s.name AS service_name,
            u.full_name AS user_name,
            u.email AS user_email
        FROM appointments a
        JOIN services s ON a.service_id = s.id
        JOIN users u ON a.user_id = u.id
        ORDER BY a.appointment_datetime DESC
    `;
    return dbPool.query(SQLQuery);
};

// NEW FUNCTION: Delete an appointment by its ID and the user's ID
const deleteByIdAndUserId = (appointmentId, userId) => {
    const SQLQuery = 'DELETE FROM appointments WHERE id = ? AND user_id = ?';
    return dbPool.query(SQLQuery, [appointmentId, userId]);
};

// UPDATE THE EXPORTS
module.exports = {
    createNew,
    findByUserId,
    updateStatusById, 
    getAll,
    deleteByIdAndUserId,
}