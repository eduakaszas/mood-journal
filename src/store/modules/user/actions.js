export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function loginSuccess(username) {
    return {
        type: LOGIN_SUCCESS,
        payload: username
    };
};

export function loginFailure() {
    return {
        type: LOGIN_FAILURE
    };
};
