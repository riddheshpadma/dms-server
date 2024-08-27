const User = require('../models/Users.Model');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { role, name, gender, phoneNo, email, password, departmentId, prn, semesterId, dob, permanentAddress, residentialAddress, city, biometricData, facultyEducation, facultyExperience, facultyPhoto, parentsName, relation, parentsPhoneNo, parentsEmail } = req.body;

        // Validate input
        if (!role || !name || !gender || !phoneNo || !email || !password || !departmentId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the user already exists by email or phone number
        const existingUser = await User.findOne({ $or: [{ email }, { phoneNo }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or phone number already exists' });
        }

        // Create user object based on role
        let userData = {
            role,
            name,
            gender,
            phoneNo,
            email,
            password,
            departmentId,
            biometricData
        };

        // Add role-specific fields
        if (role === 'Student') {
            if (!prn || !semesterId || !dob) {
                return res.status(400).json({ message: 'Missing required student fields' });
            }

            userData = {
                ...userData,
                prn,
                semesterId,
                dob,
                permanentAddress,
                residentialAddress,
                city,
                parentsName,
                relation,
                parentsPhoneNo,
                parentsEmail
            };
        } else if (role === 'Faculty') {
            userData = {
                ...userData,
                facultyEducation,
                facultyExperience,
                facultyPhoto
            };
        }

        // Create and save the new user
        const newUser = new User(userData);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Registration failed. Please try again.', error: error.message });
    }
};

// Get all users (Admin Only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users.', error: error.message });
    }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user.', error: error.message });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user.', error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user.', error: error.message });
    }
};
