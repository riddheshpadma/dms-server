const jwt = require('jsonwebtoken');

const secretKey = 'riddhesh0712'; // Replace with your secret key

// Generate JWT Token
exports.generateToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                userId: user._id, // Use _id for MongoDB documents
                role: user.role,
                email: user.email,
                phoneNo: user.phoneNo
            },
            secretKey,
            { expiresIn: '1h' }, // Token expiration time
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

// Verify JWT Token
exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};
