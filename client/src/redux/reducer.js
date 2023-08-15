const initialState = {
      notes: []    
  };

  //Iniciamos el estado global con un array vacio que se modificara segun el caso. GetNotes establecera el estado con todas las notas
  // Add nota hara una copia del estado global mas la nueva nota.
  //Delete Note filtrara del estado la nota eliminada cuyo id se encuentra en payload.
  // update note modificara la nota que se encuentre en el estado con los datos que se encuentran en payload.

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_NOTES": {
            return {
                ...state,
                notes: action.payload
            }
        }
        case "ADD_NOTE": {
            return {
                notes: [ action.payload, ...state.notes ],
                ...state
            }
        }
        case "DELETE_NOTE": {
            const deletedNoteId = action.payload;
            return {
                notes: state.notes.filter(note => note.id !== deletedNoteId),
                ...state
            };
        }
        case "UPDATE_NOTE": {
            return {
                ...state,
                notes: state.notes.map(note => note._id === action.payload ? action.payload : note)
            }
        }
        default:
            return { ...state };
    }
};
export default reducer;