const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    assignmentTitle: { 
        type: String, 
        required: true,
        trim: true 
    },
    assignmentDescription: { 
        type: String, 
        required: true 
    },
    assignmentFileURL: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    assignmentDueDate: { 
        type: Date, 
        required: true 
    },
    facultyID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty', 
        required: true 
    },
    departmentID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department', 
        required: true 
    },
    semesterID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Semester', 
        required: true 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

// Middleware to update 'lastUpdated' field on each save
AssignmentSchema.pre('save', function(next) {
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
