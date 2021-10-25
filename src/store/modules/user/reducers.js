import { LOGIN_SUCCESS } from './actions';
import { LOGIN_FAILURE } from './actions';
import { SIGNOUT_SUCCESS } from './actions';

const initialState = {
  username: '',
  isLoggedIn: false,
  error: '',
  userId: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        username: action.payload.username,
        isLoggedIn: true,
        error: '',
        userId: action.payload.userId,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        error: 'The username or password you entered is incorrect!',
      };

    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
}

export default reducer;
