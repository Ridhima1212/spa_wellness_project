// src/api/users.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { protect } = require('../middleware/auth.middleware');

// GET /api/users/profile
// The 'protect' middleware runs first. If it succeeds, 'getUserProfile' runs next.
router.get('/profile', protect, userController.getUserProfile);

module.exports = router;