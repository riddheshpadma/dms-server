const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.Controller');

// Login Route
router.post('/login', authController.loginUser);

module.exports = router;
