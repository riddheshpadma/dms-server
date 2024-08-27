const mongoose = require('mongoose');

const ParentsDetailsSchema = new mongoose.Schema({
    ParentsName: { type: String, required: true },
    Relation: { type: String, required: true },
    PhoneNo: { type: String, required: true },
    Email: { type: String, required: true },
    StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Students', required: true }
}, { timestamps: true });

module.exports = mongoose.model('ParentsDetails', ParentsDetailsSchema);