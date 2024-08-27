const express = require('express');
const router = express.Router();
const leaveRequestController = require('../controller/leaveRequest.Controller');
const { asyncHandler, errorHandler } = require('../middlewares/errorHandler');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

// Routes
router.post('/student/leave-requests', authenticateAndAuthorize(['Student', 'Admin']), asyncHandler(leaveRequestController.createLeaveRequest));
router.get('admin/leave-requests',authenticateAndAuthorize(['Admin']),  asyncHandler(leaveRequestController.getLeaveRequests));
router.route('admin/leave-requests/:id', authenticateAndAuthorize(['Admin']))
        .put(asyncHandler(leaveRequestController.updateLeaveRequest))
        .delete(asyncHandler(leaveRequestController.deleteLeaveRequest));
// Error handling middleware
router.use(errorHandler);

module.exports = router;
