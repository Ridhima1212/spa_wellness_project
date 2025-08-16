// src/controllers/appointments.controller.js
const Appointment = require('../models/appointment.model');

const createAppointment = async (req, res) => {
    const userId = req.user.id; 
    const { serviceId, appointmentDatetime } = req.body;

    if (!serviceId || !appointmentDatetime) {
        return res.status(400).json({ message: 'Service ID and appointment date/time are required.' });
    }

    try {
        await Appointment.createNew(userId, serviceId, appointmentDatetime);
        res.status(201).json({
            message: 'Appointment booked successfully!',
            data: { userId, serviceId, appointmentDatetime },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ADD THIS NEW FUNCTION
const getUserAppointments = async (req, res) => {
    const userId = req.user.id;

    try {
        const [appointments] = await Appointment.findByUserId(userId);
        res.json({
            message: 'Successfully fetched user appointments',
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// UPDATE THE EXPORTS
module.exports = {
    createAppointment,
    getUserAppointments,
};