const Event = require('../models/Events.Model');

// GET /events (fetch events)
const getEvents = (req, res) =>{
    const body = req.body

    console.log('Get events')
    res.status(200).json(body);
}

// POST /events (create event)
const createEvent = async (req, res) =>{
    try {
        const { eventTitle, eventDescription, eventDate, eventLocation, organisedBy, departmentId, semesterId } = req.body;

        // Validate that required fields are present
        if (!eventTitle || !eventDescription || !eventDate || !eventLocation || !organisedBy) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const event = new Event({
            eventTitle,
            eventDescription,
            eventDate,
            eventLocation,
            organisedBy,
            departmentId,
            semesterId
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
}

// PUT /events/ (update event)
const updateEvent = async (req, res) =>{
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
}

// DELETE /events/ (delete event)
const deleteEvent = async (req, res) =>{
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getEvents, createEvent, updateEvent, deleteEvent}