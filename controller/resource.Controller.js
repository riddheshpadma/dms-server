const ResourcesModel = require('../models/Resources.Model');

// GET /resources (fetch resources)
const getResources = async (req, res, next) => {
    try {
        const resources = await ResourcesModel.find().populate('facultyId courseId departmentId semesterId');
        res.status(200).json(resources);
    } catch (error) {
        next(error);
    }
}

// POST /resources (create resource)
const createResource = async (req, res, next) => {
    try {
        const { resourceTitle, resourceDescription, resourceURL, facultyId, courseId, departmentId, semesterId } = req.body;

        // Validate that required fields are present
        if (!resourceTitle || !resourceDescription || !resourceURL) {
            return res.status(400).json({ 
                error: 'All required fields must be provided' });
        }

        const resource = new ResourcesModel({
            resourceTitle,
            resourceDescription,
            resourceURL,
            facultyId,
            courseId,
            semesterId,
            departmentId,
            
        });

        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        next(error);
    }
}

// PUT /resources/:id (update resource)
const updateResource = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedResource = await ResourcesModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json(updatedResource);
    } catch (error) {
        next(error);
    }
}

// DELETE /resources/:id (delete resource)
const deleteResource = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedResource = await ResourcesModel.findByIdAndDelete(id);
        if (!deletedResource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getResources, createResource, updateResource, deleteResource }
