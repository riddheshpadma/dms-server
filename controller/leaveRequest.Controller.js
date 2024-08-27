const LeaveRequestModel = require('../models/LeaveRequest.Model');

// Create a new gate pass request
exports.createLeaveRequest = async (req, res) => {
    const { studentId, departmentId, semesterId, leaveType, startDate, endDate, leaveReason, status, approvedBy } = req.body;

    const newLeaveRequest = new LeaveRequestModel({
        studentId,
        leaveType,
        startDate,
        endDate,
        leaveReason,
        status,
        approvedBy,
    });

    const savedLeaveRequest = await newLeaveRequest.save();
    res.status(201).json(savedLeaveRequest);
};

// Get all gate pass requests (with optional filters)
exports.getLeaveRequests = async (req, res) => {
    const filters = req.query;
    const leaveRequests = await LeaveRequestModel.find(filters).populate('studentId');
    res.status(200).json(leaveRequests);
};

// Update a gate pass request
exports.updateLeaveRequest = async (req, res) => {
    const { id } = req.params;
    const updatedLeaveRequest = await LeaveRequestModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLeaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
    }
    res.status(200).json(updatedLeaveRequest);
};

// Delete a gate pass request
exports.deleteLeaveRequest = async (req, res) => {
    const { id } = req.params;
    const deletedLeaveRequest = await LeaveRequestModel.findByIdAndDelete(id);
    if (!deletedLeaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
    }
    res.status(204).send(); // No content response
};
