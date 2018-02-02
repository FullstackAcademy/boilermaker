import axios from 'axios';
import history from '../history';

const defaultState = {
  userList: [],
  singleUser: {}
};

const GET_USERS = 'GET_USERS';
const GET_SINGLE_USER = 'GET_SINGLE_USER';
const UPDATE_USER = 'UPDATE_USER'

const getUsers = users => ({ type: GET_USERS, users })
const getSingleUser = user => ({ type: GET_SINGLE_USER, user })
const updateUser = updatedUser => ({ type: UPDATE_USER, updatedUser })

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

export const createUserName = (user) =>
  dispatch =>
    axios.put(`/api/users/${user.userId}`, user)
      .then(res => {
        dispatch(updateUser(res.data));
        history.push(`/users/${res.data.id}`);
      })
      .catch(err => console.error(err))

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
    default:
      return state;
  }
}