import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000/api';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const GET_JOKES = 'GET_JOKES';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error,
  };
};

export const register = function(username, password, confirmPassword, history) {
  return async (dispatch) => {
    if (password !== confirmPassword) {
      dispatch(authError('Password confirmation doesn\'t match!'));
      return;
    }
    console.log("about to try");
    try {
      console.log('Began waiting for post.');
      await axios.post(`${ROOT_URL}/users`, { username, password });
      dispatch({ type: USER_REGISTERED });
      history.push('/signin');
    } catch(err) {
      console.log('Error posting user:', err);
      dispatch(authError('Failed to register user'));
    }
  };
};

export const login = function(username, password, history) {
  return async dispatch => {
    try {
      const response = await axios.post(`${ROOT_URL}/login`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      dispatch({ type: USER_AUTHENTICATED });
      history.push('/jokes');
    } catch(err) {
      dispatch(authError('There was a problem getting the signin token.'));
    };
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.clear('token');
    //history.push('/signin');
  };
};

export const getUsers = function() {
  return async dispatch => {
    try {
      const response = await axios.get(`${ROOT_URL}/users`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch(err) {
      dispatch(authError('failed to fetch users.'));
    };
  };
};

export const getJokes = function() {
  return async dispatch => {
    try {
      const response = await axios.get(`${ROOT_URL}/jokes`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      dispatch({
        type: GET_JOKES,
        payload: response.data,
      });
    } catch(err) {
      dispatch(authError('Not authorized! Not joking!'));
    };
  };
};