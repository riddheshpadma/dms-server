const mongoose = require('mongoose');
const validator = require('validator');

const AlumniSchema = new mongoose.Schema({
    alumniName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    graduationYear: { 
        type: String, 
        required: true,
        validate: {
            validator: function(value) {
                return /^\d{4}$/.test(value); // Validates that graduationYear is a 4-digit number
            },
            message: 'Graduation year must be a valid 4-digit year'
        }
    },
    currentPosition: { type: String, required: true },
    linkedInProfile: { 
        type: String, 
        validate: {
            validator: validator.isURL,
            message: 'Invalid URL format'
        }
    },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

// Optional: Add indexes to improve query performance
AlumniSchema.index({ alumniName: 1 });
AlumniSchema.index({ graduationYear: 1 });

module.exports = mongoose.model('Alumni', AlumniSchema);
