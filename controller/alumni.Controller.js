const AlumniModel = require('../models/Alumni.Model');

// Create a new gate pass request
exports.createAlumni = async (req, res) => {
    const { alumniName, email, graduationYear, currentPosition, linkedInProfile} = req.body;

    const newAlumni = new AlumniModel({
        alumniName,
        email,
        graduationYear,
        currentPosition,
        linkedInProfile,
    });

    const savedAlumni = await newAlumni.save();
    res.status(201).json(savedAlumni);
};

// Get all gate pass requests (with optional filters)
exports.getAlumni = async (req, res) => {
    const body = req.body;
    console.log('alumniGot')
    res.status(200);
};

// Update a gate pass request
exports.updateAlumni = async (req, res) => {
    const { id } = req.params;
    const updatedAlumni = await AlumniModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAlumni) {
        return res.status(404).json({ message: 'Alumni not found' });
    }
    res.status(200).json(updatedAlumni);
};

// Delete a gate pass request
exports.deleteAlumni = async (req, res) => {
    const { id } = req.params;
    const deletedAlumni = await AlumniModel.findByIdAndDelete(id);
    if (!deletedAlumni) {
        return res.status(404).json({ message: 'Alumni not found' });
    }
    res.status(204).send(); // No content response
};
