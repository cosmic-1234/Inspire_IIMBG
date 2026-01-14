const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log('Verifying token...');
    console.log('Cookies:', req.cookies);
    console.log('Verifying token...');
    let token = req.cookies.token;

    // Check Authorization header if cookie is missing
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('Token found in Authorization header');
    }

    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    authorizeRole
};
