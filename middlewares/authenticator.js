const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

AuthenticatorJWT = (req, res, next) => {
    const tokenWithBearer = req.headers?.authorization;
    const token = tokenWithBearer?.split(' ')[1];
    if (!token) {
        res.status(404).json({ errorMessage: 'No token. Access Denied' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({ errorMessage: 'You cannot access this route due to invalid token.' });
    }
}

isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 1) {
        return next();
    } else {
        return res.status(401).send({ errorMessage: 'This route is protected!.' });
    }
}


module.exports = { AuthenticatorJWT, isAdmin };