const express = require('express');
const router = express.Router();
const gatePassController = require('../controller/gatePassRequest.Controller');
const { asyncHandler, errorHandler } = require('../middlewares/errorHandler');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken'); // Ensure this import is added

// Routes
router.post('/student/gate-pass-requests', authenticateAndAuthorize(['Student']), asyncHandler(gatePassController.createGatePassRequest));
router.get('/gate-pass-requests', authenticateAndAuthorize(['Faculty', 'Admin']), asyncHandler(gatePassController.getGatePassRequests));
router.route('/student/gate-pass-requests/:id', authenticateAndAuthorize(['Student', 'Admin'])) // Missing '/' at the beginning of the route
    .put(asyncHandler(gatePassController.updateGatePassRequest))
    .delete(asyncHandler(gatePassController.deleteGatePassRequest));

// Error handling middleware
router.use(errorHandler);

module.exports = router;
