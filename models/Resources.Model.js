const mongoose = require('mongoose');
const validator = require('validator');

const resourcesSchema = new mongoose.Schema({
    resourceTitle: { 
        type: String, 
        required: true 
    },
    resourceDescription: { 
        type: String, 
        required: true 
    },
    resourceURL: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return validator.isURL(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    },
    facultyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faculty', 
        required: true 
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses', 
        required: true,
        index: true // Add indexing for frequent queries
    },
    semesterId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Semester', 
        required: false 
    },
    departmentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department', 
        required: true 
    }
}, { 
    timestamps: true 
});

// Adding an index to the resourceTitle to optimize search queries
resourcesSchema.index({ resourceTitle: 'text' });

module.exports = mongoose.model('Resources', resourcesSchema);
