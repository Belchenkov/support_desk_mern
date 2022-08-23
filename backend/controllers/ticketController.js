const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    res.status(StatusCodes.OK)
        .json({
            message: 'getTickets'
        })
});

// @desc Get user tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    res.status(StatusCodes.CREATED)
        .json({
            message: 'createTickets'
        })
});

module.exports = {
    getTickets,
    createTicket,
};