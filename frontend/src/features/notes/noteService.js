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

const createNote = async ({ noteText, ticketId }, token) => {
    const response = await axios.post(API_URL + ticketId + '/notes', { text: noteText }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response?.data.status) {
        return response.data.note;
    }
};

const noteService = {
    createNote,
    getNotes,
};

export default noteService;