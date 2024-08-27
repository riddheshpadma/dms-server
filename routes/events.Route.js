const express = require('express')
const eventController = require('../controller/event.Controller');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/', authenticateAndAuthorize(['Student', 'Faculty', 'Admin']), eventController.getEvents)
router.get('/admin/events', authenticateAndAuthorize(['Admin']), eventController.getEvents)


router.post('/admin/events', authenticateAndAuthorize(['Admin']), eventController.createEvent)

router.put('/admin/events/:id', authenticateAndAuthorize(['Admin']), eventController.updateEvent)

router.delete('/admin/events/:id', authenticateAndAuthorize(['Admin']), eventController.deleteEvent)

module.exports = router