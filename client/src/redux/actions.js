import axios from 'axios';


const URL = 'http://localhost:3001';


export const getAllNotes = () => async (dispatch) => {
        const data = await axios.get(`${URL}/notes`);
        const notes = data.data.sort((a, b) => b.createdAt - a.createdAt);
        dispatch({ type: "GET_NOTES", payload: notes });      
};

export const addNote = (note) => async (dispatch) => {
        console.log(note);
        const data = await axios.post(`${URL}/notes`, note);
        dispatch({ type: "ADD_NOTE", payload: data.data });
};

export const deleteNote = (id) => async (dispatch) => {
        await axios.delete(`${URL}/notes/${id}`);
        dispatch({ type: "DELETE_NOTE", payload: id });
    };
    

export const updateNote = ( note ) => async (dispatch) => {
        const { id } = note;
        await axios.put(`${URL}/notes/${id}`, note);
        dispatch({ type: "UPDATE_NOTE", payload: note });
};