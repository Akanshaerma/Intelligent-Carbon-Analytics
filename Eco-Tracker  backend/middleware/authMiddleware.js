const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // Check header for token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Format: Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, 'JWT_SECRET_KEY');

            // Add user id from token payload to request object
            req.user = decoded.userId;
            
            next(); // Agle function par jao
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed!' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided!' });
    }
};

module.exports = protect;