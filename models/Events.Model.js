const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    eventsId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), required: true, unique: true },
    eventTitle: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    organisedBy: { type: String, required: true },
    eventLastUpdated: { type: Date, default: Date.now },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: false },
    semesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester', required: false }
}, { timestamps: true });

module.exports = mongoose.model('Events', eventsSchema);
