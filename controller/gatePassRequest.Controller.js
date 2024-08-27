const GatePassRequest = require('../models/GatePassRequest.Model');

// Create a new gate pass request
exports.createGatePassRequest = async (req, res) => {
    const { passId, studentId, departmentId, semesterId, reason, exitTime, returnTime, status, approvedBy } = req.body;

    const newGatePassRequest = new GatePassRequest({
        passId,
        studentId,
        departmentId,
        semesterId,
        reason,
        exitTime,
        returnTime,
        status,
        approvedBy,
    });

    const savedGatePassRequest = await newGatePassRequest.save();
    res.status(201).json(savedGatePassRequest);
};

// Get all gate pass requests (with optional filters)
exports.getGatePassRequests = async (req, res) => {
    const filters = req.query;
    const gatePassRequests = await GatePassRequest.find(filters).populate('studentId departmentId semesterId');
    res.status(200).json(gatePassRequests);
};

// Update a gate pass request
exports.updateGatePassRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedGatePassRequest = await GatePassRequest.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGatePassRequest) {
            return res.status(404).json({ message: 'Gate pass request not found' });
        }
        res.status(200).json(updatedGatePassRequest);
    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred', error: error.message });
    }
};

// Delete a gate pass request
exports.deleteGatePassRequest = async (req, res) => {
    const { id } = req.params;
    const deletedGatePassRequest = await GatePassRequest.findByIdAndDelete(id);
    if (!deletedGatePassRequest) {
        return res.status(404).json({ message: 'Gate pass request not found' });
    }
    res.status(204).send(); // No content response
};
