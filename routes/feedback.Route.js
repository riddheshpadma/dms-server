const express = require('express');
const router = express.Router();

const feedbackController = require('../controller/feedback.Controller');
const { asyncHandler, errorHandler } = require('../middlewares/errorHandler');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

// Get all feedbacks
router.get('admin/feedbacks', authenticateAndAuthorize(['Admin']), asyncHandler(feedbackController.getFeedbacks));

// Create a new feedback
router.post('/student/feedback', authenticateAndAuthorize(['Student', 'Admin']), asyncHandler(feedbackController.createFeedback));

// Update or delete feedback by ID
router.route('/student/feedback/:id', authenticateAndAuthorize(['Admin']), )
    .put(asyncHandler(feedbackController.updateFeedback))
    .delete(asyncHandler(feedbackController.deleteFeedback));

// Error handling middleware
router.use(errorHandler);

module.exports = router;
