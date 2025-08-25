// src/api/appointments.routes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointments.controller');
const { protect } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// --- Customer Routes ---
router.post('/', protect, appointmentController.createAppointment);
router.get('/my-appointments', protect, appointmentController.getUserAppointments);
// This is the route that was likely missing
router.delete('/:id', protect, appointmentController.deleteAppointment); 

// --- Admin Routes ---
router.get('/', protect, isAdmin, appointmentController.getAllAppointments);
router.patch('/:id/status', protect, isAdmin, appointmentController.updateAppointmentStatus);

module.exports = router;
