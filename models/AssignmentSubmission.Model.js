const mongoose = require('mongoose');

const AssignmentSubmissionSchema = new mongoose.Schema({
    assignmentID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Assignment', 
        required: true 
    },
    submissionFileURL: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    submitDate: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    facultyID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty', 
        required: true 
    },
    studentID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Students', 
        required: true 
    },
    plagiarismScore: { 
        type: Number, 
        required: true,
        min: [0, 'Plagiarism score cannot be less than 0'],
        max: [100, 'Plagiarism score cannot be more than 100']
    },
    assignmentGrade: { 
        type: String, 
        required: true,
        enum: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

// Middleware to update 'lastUpdated' field on each save
AssignmentSubmissionSchema.pre('save', function(next) {
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model('AssignmentSubmission', AssignmentSubmissionSchema);
