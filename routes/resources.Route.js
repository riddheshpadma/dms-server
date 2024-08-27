const express = require('express');
const resourceController = require('../controller/resource.Controller');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

const router = express.Router();

// Route for fetching resources
router.get('/', resourceController.getResources);
router.get('/faculty/resources', authenticateAndAuthorize(['Faculty', 'Admin']), resourceController.getResources);

// Route for creating a new resource
router.post('/faculty/resources', authenticateAndAuthorize(['Faculty', 'Admin']), resourceController.createResource);

// Route for updating a resource
router.put('/faculty/resources/:id', authenticateAndAuthorize(['Faculty', 'Admin']), resourceController.updateResource);

// Route for deleting a resource
router.delete('/faculty/resources/:id', authenticateAndAuthorize(['Faculty', 'Admin']), resourceController.deleteResource);

module.exports = router;
