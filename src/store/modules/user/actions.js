export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}

export function signoutSuccess() {
  return {
    type: SIGNOUT_SUCCESS,
  };
}
