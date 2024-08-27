const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Students', required: true },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(value) {
                // Ensure that the end date is not before the start date
                return value >= this.startDate;
            },
            message: 'End date cannot be before start date'
        }
    },
    leaveReason: { type: String, required: true },
    status: { 
        type: String, 
        required: true, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: false }, // Optional reference
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

// Optional: Add indexes to improve query performance
LeaveRequestSchema.index({ studentId: 1 });
LeaveRequestSchema.index({ status: 1 });
LeaveRequestSchema.index({ startDate: 1 });

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);
