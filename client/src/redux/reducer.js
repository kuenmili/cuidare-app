const initialState = {
      notes: []    
  };

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