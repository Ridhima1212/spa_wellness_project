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

// UPDATE THE EXPORTS
module.exports = {
    createNew,
    findByUserId, 
};