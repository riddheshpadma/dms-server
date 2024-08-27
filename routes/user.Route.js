const express = require('express');
const router = express.Router();
const adminUserController = require('../controller/user.Controller');

// Register a new user
router.post('/register', adminUserController.registerUser);

// Get all users (Admin Only)
router.get('/', adminUserController.getAllUsers);

// Get a specific user by ID
router.get('/:id', adminUserController.getUserById);

// Update user details
router.put('/update/:id', adminUserController.updateUser);

// Delete a user
router.delete('/delete/:id', adminUserController.deleteUser);

module.exports = router;
