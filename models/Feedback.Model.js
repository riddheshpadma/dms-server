const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Students', 
        required: true, 
        index: true 
    },
    departmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department', 
        required: true, 
        index: true 
    },
    semesterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Semester', 
        required: false 
    }, // Optional reference
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Events', 
        required: false 
    }, // Optional reference
    facultyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty', 
        required: false, 
        index: true 
    }, // Optional reference
    feedbackText: { 
        type: String, 
        required: true,
        minlength: 10,
        maxlength: 1000 
    }, // Added field for actual feedback content
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        required: false 
    }, // Rating field (if applicable)
    isAnonymous: { 
        type: Boolean, 
        default: false 
    }, // Indicates if feedback is anonymous
    response: {
        type: String,
        maxlength: 500,
        required: false
    }, // Optional field for admin or faculty response to feedback
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending'
    }, // Tracks feedback status
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
