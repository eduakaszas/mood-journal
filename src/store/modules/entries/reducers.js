import { SET_ENTRIES } from './actions';
import { ADD_ENTRY } from './actions';
import { DELETE_ENTRY } from './actions';
import { EDIT_ENTRY } from './actions';

const initialState = {
    entries: []
}

function reducer( state = initialState, action ) {
    switch(action.type) {
        case SET_ENTRIES :
            return {
                ...state,
                entries: action.payload
            };

        case ADD_ENTRY :
            let updatedEntries = state.entries;
            updatedEntries.push(action.payload);

            return {
                ...state,
                // entries: [...state.entries, action.payload]
                entries: updatedEntries
            };

        case DELETE_ENTRY :
            console.log(action.payload)

            return {
                ...state,
                // entries: [...state.entries, action.payload]
                entries: state.entries.filter( e => e._id !== action.payload)
            };

        case EDIT_ENTRY :
            console.log(action.payload)

            // map function
            let editedEntries = state.entries.map( entry => {
                if ( action.payload._id === entry._id ) {
                    return action.payload
                }

                return entry
            })

            return {
                ...state,
                // entries: [...state.entries, action.payload]
                entries: editedEntries
            };

        default:
            return state;
        }
    }

export default reducer;