import { LOGIN_SUCCESS } from './actions';
import { LOGIN_FAILURE } from './actions';

const initialState = {
    username: '',
    isLoggedIn: false,
    error: ''
}

function reducer( state = initialState, action ) {
    switch(action.type) {
        case LOGIN_SUCCESS :
            return {
                ...state,
                username: action.payload,
                isLoggedIn: true,
                error: ''
            };

        case LOGIN_FAILURE :
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                error: 'The username or password you entered is incorrect!'
            };
            
        default:
            return state;
    }
}

export default reducer;