import axios from 'axios';
import history from '../history';

const defaultState = {
  userList: [],
  singleUser: {},
  searchUserList: []
};

const GET_USERS = 'GET_USERS';
const GET_SINGLE_USER = 'GET_SINGLE_USER';
const UPDATE_USER = 'UPDATE_USER'
const GET_SEARCH_USERS = 'GET_SEARCH_USERS'

const getUsers = users => ({ type: GET_USERS, users })
const getSingleUser = user => ({ type: GET_SINGLE_USER, user })
const updateUser = updatedUser => ({ type: UPDATE_USER, updatedUser })
const searchUsers = users => ({ type: GET_SEARCH_USERS, users })

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

export const editUser = (user) =>
  dispatch =>
    axios.put(`/api/users/${user.id}`, user)
      .then(res => dispatch(updateUser(res.data)))
      .catch(console.error)

export const checkUserName = userName => {
  return (defaultState.userList.find(user => {
    return user.name === userName;
  }))
}

export const createUserName = (user) =>
  dispatch =>
    axios.put(`/api/users/${user.userId}`, user)
      .then(res => {
        dispatch(updateUser(res.data));
        history.push(`/users/${res.data.id}`);
      })
      .catch(err => console.error(err))

export const fetchSearchUsers = searchTerm =>
  dispatch => {
    return axios.get(`/api/users?search=${searchTerm}`)
      .then(res => dispatch(searchUsers(res.data)))
      .catch(err => console.log(err));
  }

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
    case UPDATE_USER:
      return {
        ...state,
        singleUser: action.updatedUser
      }
    case GET_SEARCH_USERS:
      return {
        ...state,
        searchUserList: action.users
      }
    default:
      return state;
  }
}