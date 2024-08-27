// Announcement.Controller.js

const AnnouncementModel = require('../models/Anouncement.Model');

// Create Announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { announcementTitle, announcementContent, announcementCreatedBy, departmentId, semesterId } = req.body;

        const newAnnouncement = new AnnouncementModel({
            announcementTitle,
            announcementContent,
            announcementCreatedBy,
            departmentId,
            semesterId
        });

        const savedAnnouncement = await newAnnouncement.save();
        res.status(201).json(savedAnnouncement);
    } catch (error) {
        res.status(500).json({ message: 'Error creating announcement', error });
    }
};

// Get Announcements
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await AnnouncementModel.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching announcements', error });
    }
};

// Update Announcement
exports.updateAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAnnouncement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        res.status(500).json({ message: 'Error updating announcement', error });
    }
};

// Delete Announcement
exports.deleteAnnouncement = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAnnouncement = await AnnouncementModel.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: 'Error deleting announcement', error });
    }
};


