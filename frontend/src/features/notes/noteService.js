import axios from 'axios';

const API_URL = '/api/tickets/';

const getNotes = async (ticketId, token) => {
    console.log(token);
    const response = await axios.get(API_URL + ticketId + '/notes', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response?.data.status) {
        return response.data.notes;
    }
};

const createNote = async (ticketData, token) => {
    const response = await axios.post(API_URL, ticketData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response?.data.status) {
        return response.data;
    }
};

const noteService = {
    createNote,
    getNotes,
};

export default noteService;