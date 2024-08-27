// announcement.Routes.js

const express = require('express');
const router = express.Router();

const announcementController = require('../controller/announcement.Controller');
const { asyncHandler, errorHandler } = require('../middlewares/errorHandler');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

// Get all announcements
router.get('/announcements', authenticateAndAuthorize(['Student', 'Faculty', 'Admin']), authenticateAndAuthorize(['Student', 'Faculty', 'Admin']), asyncHandler(announcementController.getAnnouncements));

// Create a new custom announcement
router.post('/admin/announcements', authenticateAndAuthorize(['Admin']), asyncHandler(announcementController.createAnnouncement));

// Update or delete an custom announcement by ID
router.route('/admin/announcements/:id', authenticateAndAuthorize(['Admin']))
    .put(asyncHandler(announcementController.updateAnnouncement))
    .delete(asyncHandler(announcementController.deleteAnnouncement));

// Error handling middleware
router.use(errorHandler);

module.exports = router;

// here we dont need database to create announcements 
// we can create announcements with data of which is recently updated on particular module 