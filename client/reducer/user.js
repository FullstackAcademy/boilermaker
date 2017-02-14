import axios from 'axios';
import { browserHistory } from 'react-router';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)));

export const login = (email, password) =>
  dispatch =>
    axios.post('/auth/login', { email, password })
      .then(res => dispatch(getUser(res.data)));

export const signup = (email, password) =>
  dispatch =>
    axios.post('/auth/signup', { email, password })
      .then(res => dispatch(getUser(res.data)))

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
