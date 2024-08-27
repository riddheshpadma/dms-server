const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    role: { 
        type: String, 
        required: true,
        enum: ['Student', 'Faculty', 'Admin'] 
    },
    name: { type: String, required: true, trim: true },
    gender: { 
        type: String, 
        required: true,
        enum: ['Male', 'Female', 'Other'] 
    },
    phoneNo: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); 
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true },
    departmentId: { type: String, ref: 'Department', required: true },
    
    // Student-specific fields
    prn: { type: String, unique: true, sparse: true },
    semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', sparse: true },
    dob: { 
        type: Date, 
        validate: {
            validator: function(v) {
                return v <= new Date(); 
            },
            message: props => `${props.value} is not a valid date of birth!`
        },
        sparse: true 
    },
    permanentAddress: { type: String, sparse: true }, 
    residentialAddress: { type: String, sparse: true }, 
    city: { type: String, sparse: true }, 
    biometricData: { 
        type: String, 
        sparse: true 
    },
    
    // New student-specific fields
    parentsName: { type: String, sparse: true },
    relation: { type: String, sparse: true },
    parentsPhoneNo: { 
        type: String, 
        sparse: true, 
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    parentsEmail: { 
        type: String, 
        sparse: true, 
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    // Faculty-specific fields
    facultyEducation: { type: String, sparse: true },
    facultyExperience: { type: String, sparse: true }, 
    facultyPhoto: { type: String, sparse: true }
}, { timestamps: true });

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare input password with stored hashed password
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

// Method to save biometric data
userSchema.methods.saveBiometricData = async function (biometricData) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.biometricData = await bcrypt.hash(biometricData, salt);
        await this.save();
    } catch (error) {
        throw new Error('Error saving biometric data');
    }
};

// Method to verify biometric data
userSchema.methods.verifyBiometricData = async function (inputBiometricData) {
    try {
        return await bcrypt.compare(inputBiometricData, this.biometricData);
    } catch (error) {
        throw new Error('Error verifying biometric data');
    }
};

// Index fields for better performance
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
