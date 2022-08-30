const express = require('express');

const { getTickets, createTicket, getTicket } = require('../controllers/ticketController.js');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket);

router.route('/:id')
    .get(protect, getTicket)

module.exports = router;