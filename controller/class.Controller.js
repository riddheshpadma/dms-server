const ClassModel = require('../models/Class.Model');
const DepartmentModel = require('../models/Departments.Model'); // Ensure this is correctly imported

exports.createClass = async (req, res) => {
    try {
        const { classId, className, classCoordinator, departmentId } = req.body;

        // Verify that the departmentId exists in the Department collection
        const department = await DepartmentModel.findOne({ departmentId: departmentId });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        const newClass = new ClassModel({
            classId,
            className,
            classCoordinator,
            departmentId // Include departmentId in the new class
        });

        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Class with this classId already exists' });
        }
        res.status(500).json({ message: 'An internal server error occurred', error });
    }
};


// Get all classes (with optional filters)
exports.getClass = async (req, res) => {
    try {
        const departmentId = req.params.departmentId
        const classData = await ClassModel.find();
        if (!classData) {
            return res.status(404).json({ message: 'Classes not found' });
        }
        const filters = { isActive: true, departmentId }; // define your filter condition here
        const classes = await ClassModel.find(filters)
            .populate({ path: 'departmentId', model: 'Department' });
        res.status(200).json({ classes });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An internal server error occurred', error });
    }
};



exports.updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { departmentId } = req.body;

        // Verify that the departmentId exists in the Department collection (if provided)
        if (departmentId) {
            const department = await DepartmentModel.findOne({ departmentId: departmentId });
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }
        }

        const updatedClass = await ClassModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred', error });
    }
};

// Delete a class
exports.deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClass = await ClassModel.findByIdAndDelete(id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred', error });
    }
};
