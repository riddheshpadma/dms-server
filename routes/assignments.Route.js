const express = require('express');
const router = express.Router();

const assignmentController = require('../controller/assignment.Controller');
const { asyncHandler, errorHandler } = require('../middlewares/errorHandler');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

// Get all assignments
router.get('/assignments', authenticateAndAuthorize(['Student', 'Faculty', 'Admin']), asyncHandler(assignmentController.getAssignments));

// Create a new assignment
router.post('/faculty/assignments', authenticateAndAuthorize(['Faculty', 'Admin']), asyncHandler(assignmentController.createAssignment));

// Update or delete an assignment by ID
router.route('/faculty/assignments/:id', authenticateAndAuthorize(['Faculty', 'Admin']))
    .put(asyncHandler(assignmentController.updateAssignment))
    .delete(asyncHandler(assignmentController.deleteAssignment));

// Error handling middleware
router.use(errorHandler);

module.exports = router;
