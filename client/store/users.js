import axios from 'axios';

const defaultState = {
  userList: [],
  filteredUserList: [],
  singleUser: {}
};

const GET_USERS = 'GET_USERS';
const GET_SINGLE_USER = 'GET_SINGLE_USER';

const getUsers = users => ({ type: GET_USERS, users })
const getSingleUser = user => ({ type: GET_SINGLE_USER, user })

export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res => dispatch(getUsers(res.data)))
      .catch(console.error)

export const fetchSingleUser = id =>
  dispatch =>
    axios.get(`/api/users/${id}`)
      .then(res => dispatch(getSingleUser(res.data)))
      .catch(console.error)

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userList: action.users
      }
    case GET_SINGLE_USER:
      return {
        ...state,
        singleUser: action.user
      }
    default:
      return state;
  }
}