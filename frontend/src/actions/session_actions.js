import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
// Add clear errors to clear errors on form
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const logoutUser = () => {
    return ({
        type: RECEIVE_USER_LOGOUT
    })
};

export const receiveCurrentUser = currentUser => {
    return({
        type: RECEIVE_CURRENT_USER,
        currentUser
    })
}

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false);
    return dispatch(logoutUser());
};

export const signUp = user => dispatch => {
    return APIUtil.signUp(user)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        APIUtil.setAuthToken(token);
        const decodedUser = jwt_decode(token);
        
        return dispatch(receiveCurrentUser(decodedUser));
      },
        (error) => {
   
          return dispatch(receiveSessionErrors(error.response.data));
        }
      )
}

export const login = user => dispatch => {
    return APIUtil
        .login(user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decodedUser = jwt_decode(token);
            return dispatch(receiveCurrentUser(decodedUser));
        },
          error => {
            return(dispatch(receiveSessionErrors(error.response.data)));
          }
        )
};