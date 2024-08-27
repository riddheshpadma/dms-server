const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentId: { type: String, required: true, unique: true }, // String type for departmentId
    departmentName: { type: String, required: true, unique: true },
    deptHead: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
