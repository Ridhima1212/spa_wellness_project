// src/api/services.routes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services.controller');

// GET all services
router.get('/', serviceController.getAllServices);

// POST a new service
router.post('/', serviceController.createNewService);

module.exports = router;