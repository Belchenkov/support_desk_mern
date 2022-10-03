const express = require('express');

const {
    getTickets,
    createTicket,
    getTicket ,
    deleteTicket,
    updateTicket,
} = require('../controllers/ticketController.js');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket);

router.route('/:id')
    .get(protect, getTicket)
    .put(protect, updateTicket)
    .delete(protect, deleteTicket)

module.exports = router;