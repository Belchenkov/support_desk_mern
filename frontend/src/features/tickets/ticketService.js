import axios from 'axios';

const API_URL = '/api/tickets';

const createTicket = async (ticketData, token) => {
    const response = await axios.post(API_URL, ticketData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response?.data.status) {
        return response.data;
    }
};

const getTickets = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response?.data.status) {
        return response.data.tickets;
    }
};

const getTicket = async (ticketId, token) => {
    const response = await axios.get(`${API_URL}/${ticketId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response?.data.status) {
        return response.data.ticket;
    }
};

const closeTicket = async (ticketId, token) => {
    const response = await axios.put(`${API_URL}/${ticketId}`, { status: 'closed' },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response?.data.status) {
        return response.data.ticket;
    }
};

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
};

export default ticketService;