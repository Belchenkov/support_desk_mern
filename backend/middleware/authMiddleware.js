const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    const headerAuth = req.headers.authorization;
    let token;

    if (headerAuth && headerAuth.startsWith('Bearer')) {
        try {
            token = headerAuth.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null);
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.UNAUTHORIZED);
            throw new Error('Not Authorized!');
        }
    }

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Not Authorized!');
    }
});

module.exports = {
    protect,
};