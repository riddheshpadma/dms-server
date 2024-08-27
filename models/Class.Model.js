const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classId: { type: String, required: true, unique: true },
    className: { type: String, required: true },
    classCoordinator: { type: String, required: true },
    departmentId: { type: String, ref: 'Department', required: true } // String type for departmentId
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
