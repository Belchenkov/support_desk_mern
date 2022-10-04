const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not authorized!');
    }

    const notes = await Note.find({ ticket: req.params.ticketId });

    res.status(StatusCodes.OK)
        .json({
            status: true,
            notes,
        })
});

// @desc Add note for a ticket
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if (ticket.user.toString() !== req.user.id) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error('User not authorized!');
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id,
    });

    res.status(StatusCodes.CREATED)
        .json({
            status: true,
            note,
        })
});

module.exports = {
    getNotes,
    addNote,
};