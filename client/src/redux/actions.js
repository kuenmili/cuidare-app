import axios from 'axios';

const URL = 'http://localhost:3001';

/* Creamos las actions de redux para establecer la comunicacion entre el cliente y el servidor */

export const getAllNotes = () => async (dispatch) => { // la funcion establece una callback asincrona que recibe el dispatch del front.
        const {data} = await axios.get(`${URL}/notes`);   // desestructuramos data de la respuesta del axios. Recibe todas las notas del back con el metodo GET
        const notes = data.reverse();              // las notas se ordenaran en reversa para rederizar primero la ultima nota creada
        dispatch({ type: "GET_NOTES", payload: notes }); // establecemos el payload de la action con todas notas ordenadas y despachamos la action al reducer.
};

export const addNote = (note) => async (dispatch) => {
        const {data} = await axios.post(`${URL}/notes`, note); // desestructuramos data de la respuesta del metodo POST de axios con la nueva nota recibida por parametro.
        dispatch({ type: "ADD_NOTE", payload: data }); // establecemos como payload la nota creada y enviamos el dispatch al reducer.
};

export const deleteNote = (id) => async (dispatch) => {
        await axios.delete(`${URL}/notes/${id}`); // metodo DELETE de axios con el id de la nota a eliminar recibido por parametro.
        dispatch({ type: "DELETE_NOTE", payload: id }); // despachamos la action con el id de la nota en payload.
    };
    

export const updateNote = ( note ) => async (dispatch) => { // recibimos por parametro la nota a actualizar.
        const { id } = note;            // desestructuramos el id de la nota
        await axios.put(`${URL}/notes/${id}`, note); // utilizamos el metodo PUT para actualizar la nota con el id y los datos de la nota.
        dispatch({ type: "UPDATE_NOTE", payload: note }); // establecemos la nota como payload y despachamos la action al reducer.
};