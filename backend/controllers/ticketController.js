const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(StatusCodes.OK)
        .json({
            status: true,
            tickets,
        })
});

// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('Not Authorized!');
    }

    res.status(StatusCodes.OK)
        .json({
            status: true,
            ticket,
        })
});

// @desc Get user tickets
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    if (!product || !description) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY);
        throw new Error('Please add a product and description');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(StatusCodes.CREATED)
        .json({
            status: true,
            ticket,
        })
});

module.exports = {
    getTickets,
    getTicket,
    createTicket,
};