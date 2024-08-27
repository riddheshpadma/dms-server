const mongoose = require('mongoose');

const gatePassRequestSchema = new mongoose.Schema({
    passId: { type: String, required: true, unique: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Students', required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: false }, // Optional reference
    reason: { type: String, required: true },
    exitTime: { type: Date, required: true },
    returnTime: { type: Date, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    approvedBy: { type: String, required: false }, // Optional
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('GatePassRequest', gatePassRequestSchema);
