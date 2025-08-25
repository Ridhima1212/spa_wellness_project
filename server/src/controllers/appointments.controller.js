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

const updateAppointmentStatus = async (req, res) => {
    const { id } = req.params; // Get appointment ID from URL
    const { status } = req.body; // Get new status from request body

    const validStatuses = ['confirmed', 'completed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    try {
        await Appointment.updateStatusById(id, status);
        res.json({
            message: `Appointment ${id} status updated to ${status}.`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// NEW FUNCTION: Get all appointments for admin
const getAllAppointments = async (req, res) => {
    try {
        const [appointments] = await Appointment.getAll();
        res.json({
            message: 'Successfully fetched all appointments',
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// This function handles the delete request
const deleteAppointment = async (req, res) => {
    const userId = req.user.id; // Get user ID from token
    const { id } = req.params; // Get appointment ID from URL

    try {
        const [result] = await Appointment.deleteByIdAndUserId(id, userId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Appointment not found or you do not have permission to delete it.' });
        }

        res.json({ message: 'Appointment successfully cancelled.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createAppointment,
    getUserAppointments,
    updateAppointmentStatus,
    getAllAppointments,
    deleteAppointment,
};
