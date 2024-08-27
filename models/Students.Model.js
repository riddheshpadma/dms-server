const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the StudentsSchema
const StudentsSchema = new mongoose.Schema({
    StudentsId: { type: String, required: true, unique: true },
    PRN: { type: String, required: true, unique: true },
    StdName: { type: String, required: true, trim: true },
    DepartmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    SemesterID: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: true },
    PhoneNo: { 
        type: String, 
        required: true, 
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Assumes a 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    Email: { 
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
    Password: { type: String, required: true },
    BiometricData: {
        type: String, // Encrypted biometric data (e.g., fingerprint or facial recognition data)
        required: false
    },
    PermenentAddress: { type: String, required: true },
    ResedentialAddress: { type: String, required: true },
    City: { type: String, required: true },
    DOB: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(v) {
                return v <= new Date(); // Ensure DOB is not in the future
            },
            message: props => `${props.value} is not a valid date of birth!`
        }
    },
    Gender: { 
        type: String, 
        required: true,
        enum: ['Male', 'Female', 'Other'] // Restrict to specific values
    }
}, { timestamps: true });

// Hash the password before saving the student
StudentsSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('Password')) {
            return next();
        }
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash password using the salt
        this.Password = await bcrypt.hash(this.Password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare input password with stored hashed password
StudentsSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.Password);
};

// Method to save biometric data
StudentsSchema.methods.saveBiometricData = async function (biometricData) {
    try {
        // Encrypt biometric data before saving
        const salt = await bcrypt.genSalt(10);
        this.BiometricData = await bcrypt.hash(biometricData, salt);
        await this.save();
    } catch (error) {
        throw new Error('Error saving biometric data');
    }
};

// Method to verify biometric data
StudentsSchema.methods.verifyBiometricData = async function (inputBiometricData) {
    try {
        return await bcrypt.compare(inputBiometricData, this.BiometricData);
    } catch (error) {
        throw new Error('Error verifying biometric data');
    }
};

// Index fields for better performance
StudentsSchema.index({ StudentsId: 1, PRN: 1, Email: 1 });

module.exports = mongoose.model('Students', StudentsSchema);
