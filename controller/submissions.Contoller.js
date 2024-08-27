const AssignmentSubmissionModel = require('../models/AssignmentSubmission.Model');

// Create submissions
exports.createSubmission = async (req, res) => {
    try {
        const { assignmentID, submissionFileURL, studentID, facultyID, plagiarismScore, assignmentGrade } = req.body;

        const newSubmission = new AssignmentSubmissionModel({
            assignmentID,
            submissionFileURL,
            studentID,
            facultyID,
            plagiarismScore,
            assignmentGrade
        });

        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        res.status(500).json({ message: 'Error creating submission', error });
    }
};

// Get all submissions
exports.getSubmissions = async (req, res) => {
    try {
        const submissions = await AssignmentSubmissionModel.find();
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submissions', error });
    }
};

// Update submissions
exports.updateSubmission = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSubmission = await AssignmentSubmissionModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(200).json(updatedSubmission);
    } catch (error) {
        res.status(500).json({ message: 'Error updating submission', error });
    }
};

// Delete submissions
exports.deleteSubmission = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSubmission = await AssignmentSubmissionModel.findByIdAndDelete(id);
        if (!deletedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: 'Error deleting submission', error });
    }
};
