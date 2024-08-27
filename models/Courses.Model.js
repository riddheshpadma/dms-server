const mongoose = require('mongoose');

const CoursesSchema = new mongoose.Schema({
    CourseID: { type: String, required: true, unique: true },
    CourseName: { type: String, required: true },
    FacultyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    DepartmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    SemesterID: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Courses', CoursesSchema);
