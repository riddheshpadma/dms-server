const express = require('express')
const router = express.Router();

const alumniController = require('../controller/alumni.Controller')
const { asyncHandler, errorHandler } = require('../middlewares/errorHandler');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

// Routes

router.get('/alumni', authenticateAndAuthorize(['Student', 'Faculty', 'Admin']), asyncHandler, alumniController.getAlumni);

router.post('admin/alumni',authenticateAndAuthorize(['Admin']), asyncHandler, alumniController.createAlumni)

router.route('/admin/alumni/:id', authenticateAndAuthorize(['Admin']))
    .put(asyncHandler, alumniController.updateAlumni)
    .delete(asyncHandler, alumniController.deleteAlumni);

//Error handling middleware
router.use(errorHandler);

module.exports = router;