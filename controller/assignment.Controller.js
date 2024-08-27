const AssignmentModel = require('../models/Assignment.Model');

// Create assignment
exports.createAssignment = async (req, res) => {
    try {
        const { assignmentTitle, assignmentDescription, assignmentFileURL, assignmentDueDate, facultyID, departmentID, semesterID } = req.body;

        const newAssignment = new AssignmentModel({
            assignmentTitle,
            assignmentDescription,
            assignmentFileURL,
            assignmentDueDate,
            facultyID,
            departmentID,
            semesterID
        });

        const savedAssignment = await newAssignment.save();
        res.status(201).json(savedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating assignment', error });
    }
};

// Get all assignments
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await AssignmentModel.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignments', error });
    }
};

// Update assignment
exports.updateAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedAssignment = await AssignmentModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json(updatedAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating assignment', error });
    }
};

// Delete assignment
exports.deleteAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAssignment = await AssignmentModel.findByIdAndDelete(id);
        if (!deletedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: 'Error deleting assignment', error });
    }
};
