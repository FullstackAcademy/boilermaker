import axios from 'axios';
import { browserHistory } from 'react-router';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

const _getUser = (dispatch, uri, body, method = 'post') =>
  axios[method](uri, body).then(res => dispatch(getUser(res.data)));

export const me = () =>
  dispatch =>
    _getUser(dispatch, '/auth/me', {}, 'get');

export const login = (email, password) =>
  dispatch =>
    _getUser(dispatch, '/auth/login', { email, password });

export const signup = (email, password) =>
  dispatch =>
    _getUser(dispatch, '/auth/signup', { email, password });

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser());
        browserHistory.push('/login');
      });

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
