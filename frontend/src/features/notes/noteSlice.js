import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import noteService from './noteService';

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(createNote.pending, state => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, state => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getNotes.pending, state => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const getNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await noteService.getNotes(ticketId, token);
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message || err.toString());
    }
});

export const createNote = createAsyncThunk('notes/create', async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await noteService.createNote(noteData, token);
    } catch (err) {
        return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message || err.toString());
    }
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
