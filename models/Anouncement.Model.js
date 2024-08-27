const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    announcementTitle: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(value) {
                return value.length <= 100; // Limit the title to 100 characters
            },
            message: 'Announcement title should be 100 characters or less'
        }
    },
    announcementContent: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value) {
                return value.length <= 1000; // Limit the content to 1000 characters
            },
            message: 'Announcement content should be 1000 characters or less'
        }
    },
    announcementDate: { type: Date, required: true, default: Date.now },
    announcementCreatedBy: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true }
}, { timestamps: true });

// Optional: Add indexes to improve query performance
announcementSchema.index({ announcementTitle: 1 });
announcementSchema.index({ announcementDate: 1 });

module.exports = mongoose.model('Announcement', announcementSchema);
