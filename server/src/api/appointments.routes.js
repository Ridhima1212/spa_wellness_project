// src/api/appointments.routes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointments.controller');
const { protect } = require('../middleware/auth.middleware');

// POST /api/appointments (to create an appointment)
router.post('/', protect, appointmentController.createAppointment);

// GET /api/appointments/my-appointments (to view user's own appointments)
router.get('/my-appointments', protect, appointmentController.getUserAppointments);

module.exports = router;