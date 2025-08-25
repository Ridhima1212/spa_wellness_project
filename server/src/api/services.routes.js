// src/api/services.routes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services.controller');
const { protect } = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/admin.middleware');

// --- PUBLIC ROUTES ---
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById); // <-- NEW: Get a single service

// --- ADMIN ONLY ROUTES ---
router.post('/', protect, isAdmin, serviceController.createNewService);
router.put('/:id', protect, isAdmin, serviceController.updateService);
router.delete('/:id', protect, isAdmin, serviceController.deleteService);

module.exports = router;
