const DepartmentModel = require('../models/Departments.Model');

// Create a new gate pass request
exports.createDepartment = async (req, res) => {
    const { departmentName, deptHead, departmentId} = req.body;

    const newDepartment = new DepartmentModel({
        departmentId,
        departmentName,
        deptHead,
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
};

// Get all gate pass requests (with optional filters)
exports.getDepartments = async (req, res) => {
    const body = req.body;
    console.log('departmentGot')
    res.status(200);
};

// Update a gate pass request
exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const updatedDepartment = await DepartmentModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDepartment) {
        return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
};

// Delete a gate pass request
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;
    const deletedDeparment = await DepartmentModel.findByIdAndDelete(id);
    if (!deletedDeparment) {
        return res.status(404).json({ message: 'Department not found' });
    }
    res.status(204).send(); // No content response
};
