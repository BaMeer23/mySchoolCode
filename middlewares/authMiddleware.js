const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Access Denied. Token missing.' });
    }

    if (!token.startsWith('Bearer ')) {
        return res.status(400).json({ status: 'error', message: 'Invalid token format. Token must start with "Bearer "' });
    }

    const extractedToken = token.split(' ')[1];

    try {
        const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).json({ status: 'error', message: 'Token is invalid or expired.' });
    }
};

module.exports = authenticateToken;
