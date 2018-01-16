import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'
/**
 * INITIAL STATE
 */
const defaultUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})
/**
 * THUNK CREATORS
 */
export const getUsersThunk = () =>
  dispatch =>
    axios.get(`/api/users`)
      .then(res => {
        dispatch(getUsers(res.data || defaultUsers))}
      )
      .catch(err => console.log(err))

export const deleteUserThunk = (id) =>
  dispatch =>
    axios.delete(`/api/users/${id}`)
      .then(() => {
        dispatch(deleteUser(id))}
      )
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_USER:
      const users = state.filter(user => user.id !== +action.id)
      return users
    default:
      return state
  }
}


