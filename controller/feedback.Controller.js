const FeedbackModel = require('../models/Feedback.Model');

// Create feedback
exports.createFeedback = async (req, res) => {
    try {
        const { studentId, eventId, feedbackText, rating, isAnonymous, response, status, facultyId, departmentId, semesterId } = req.body;

        const newFeedback = new FeedbackModel({
            studentId,
            eventId,
            feedbackText,
            rating,
            isAnonymous,
            response,
            status,
            facultyId,
            departmentId,
            semesterId
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error creating feedback', error });
    }
};

// Get all feedbacks
exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks', error });
    }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFeedback = await FeedbackModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(updatedFeedback);
    } catch (error) {
        res.status(500).json({ message: 'Error updating feedback', error });
    }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);
        if (!deletedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: 'Error deleting feedback', error });
    }
};
