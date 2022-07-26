const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/userModel');

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY);
        throw new Error('Please include all fields!!!');
    }

    // Find if user already exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res
            .status(StatusCodes.CREATED)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
    } else {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Invalid user data');
    }
});

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body;

    const user = await User.findOne({email});
    const comparePassword = await bcrypt.compare(password, user.password);

    if (user && comparePassword) {
        res
            .status(StatusCodes.OK)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
    } else {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid credentials');
    }
});

const generateToken = id => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

module.exports = {
    registerUser,
    loginUser,
};