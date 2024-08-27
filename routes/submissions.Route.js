const express = require('express');
const router = express.Router();

const submissionController = require('../controller/submissions.Contoller');
const { asyncHandler, errorHandler } = require('../middlewares/errorHandler');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

// Get all submissions
router.get('/submissions', asyncHandler(submissionController.getSubmissions));

// Create a new submission
router.post('/student/submissions', authenticateAndAuthorize(['Student', 'Admin']), asyncHandler(submissionController.createSubmission));

// Update or delete a submission by ID
router.route('/student/submissions/:id', authenticateAndAuthorize(['Student', 'Admin']), )
    .put(asyncHandler(submissionController.updateSubmission))
    .delete(asyncHandler(submissionController.deleteSubmission));

// Error handling middleware
router.use(errorHandler);

module.exports = router;
