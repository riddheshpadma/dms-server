const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const FacultySchema = new mongoose.Schema({
    FacultyID: { type: String, required: true, unique: true },
    FacultyName: { type: String, required: true },
    FacultyGender: { type: String, required: true },
    FacultyPhoneNo: { type: String, required: true },
    FacultyEmail: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    FacultyEducation: { type: String, required: true },
    FacultyExperience: { type: String, required: true },
    FacultyPhoto: { type: String },
    DepartmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
}, { timestamps: true });

// Hash the password before saving the faculty member
FacultySchema.pre('save', async function (next) {
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
FacultySchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.Password);
};

module.exports = mongoose.model('Faculty', FacultySchema);
