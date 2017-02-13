import axios from 'axios';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({
  type: GET_USER,
  user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const login = (email, password) => {
  return dispatch => {
    axios.post('/auth/login', { email, password })
      .then(res => res.data)
      .then(user => dispatch(getUser(user)));
  };
};

export const signup = (email, password) => {
  return dispatch => {
    axios.post('/auth/signup', { email, password })
      .then(res => res.data)
      .then(user => dispatch(getUser(user)));
  };
};

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
