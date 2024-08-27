// Create Department
// Create Class
// create courses
// Get Department, Class, Courses
// Update Department, Class, Course
// Delete Department, Class, Course

const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department.Controller');
const classController = require('../controller/class.Controller');
// const courseController = require('../controller/course.Controller');
const { authenticateAndAuthorize } = require('../middlewares/authenticateToken');

// Department Routes
router.post('/departments', authenticateAndAuthorize(['Admin']), departmentController.createDepartment);
router.get('/departments', authenticateAndAuthorize(['Admin', 'Faculty', 'Student']), departmentController.getDepartments);
router.put('/departments/:id', authenticateAndAuthorize(['Admin']), departmentController.updateDepartment);
router.delete('/departments/:id', authenticateAndAuthorize(['Admin']), departmentController.deleteDepartment);

// Class Routes
router.post('/classes', authenticateAndAuthorize(['Admin']), classController.createClass);
router.get('/classes', authenticateAndAuthorize(['Admin', 'Faculty', 'Student']), classController.getClass);
router.put('/classes/:id', authenticateAndAuthorize(['Admin']), classController.updateClass);
router.delete('/classes/:id', authenticateAndAuthorize(['Admin']), classController.deleteClass);

// Course Routes
// router.post('/courses', authenticateAndAuthorize(['Admin']), courseController.createCourse);
// router.get('/courses', authenticateAndAuthorize(['Admin', 'Faculty', 'Student']), courseController.getCourses);
// router.put('/courses/:id', authenticateAndAuthorize(['Admin']), courseController.updateCourse);
// router.delete('/courses/:id', authenticateAndAuthorize(['Admin']), courseController.deleteCourse);

module.exports = router;
