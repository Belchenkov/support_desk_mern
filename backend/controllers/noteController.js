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

module.exports = {
    getNotes,
};