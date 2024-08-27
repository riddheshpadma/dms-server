const User = require('../models/Users.Model');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');

// Login user by email or phone number
exports.loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: identifier.toLowerCase() }, { phoneNo: identifier }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or phone number' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate token
        const token = await jwtUtils.generateToken(user);
        
        // Respond with token and user info
        res.status(200).json({ token, user: { id: user._id, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred', error: error.message });
    }
};
