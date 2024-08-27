const jwtUtils = require('../utils/jwtUtils');

// Middleware to authenticate JWT token and authorize based on role
exports.authenticateAndAuthorize = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'] || req.headers['Authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                console.log("Token not provided");
                return res.status(401).json({ message: 'Access denied. No token provided.' });
            }

            // Verify the token using async/await
            const decoded = await jwtUtils.verifyToken(token);

            // Check if the user's role is included in the requiredRoles array
            if (requiredRoles && !requiredRoles.includes(decoded.role)) {
                console.log("Insufficient permissions for role:", decoded.role);
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            req.user = decoded;
            console.log("Token and role validated successfully for user:", req.user.userId);
            next();
        } catch (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    };
};
