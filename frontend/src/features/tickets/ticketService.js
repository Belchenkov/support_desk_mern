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

const ticketService = {
    createTicket,
};

export default ticketService;