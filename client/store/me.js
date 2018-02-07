import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = updatedUser => ({ type: UPDATE_USER, updatedUser })

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/home')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

// export const createUserName = (user) =>
//   dispatch =>
//     axios.put(`/api/users/${user.userId}`, user)
//       .then(res => {
//         dispatch(updateUser(res.data));
//         history.push('/');
//       })
//       .catch(err => console.error(err))

export const deleteUser = (id) =>
  dispatch =>
    axios.delete(`/api/users/${id}`)
      .then(() => {
        dispatch(removeUser())
        history.push('/')
      })
      .catch(console.error)

// export const editUser = (user) =>
//   dispatch =>
//     axios.put(`/api/users/${user.id}`, user)
//       .then(res => dispatch(updateUser(res.data)))
//       .catch(console.error)

export const fetchUser = (id) =>
  dispatch =>
      axios.get(`/api/users/${id}`)
        .then(res => dispatch(getUser(res.data)))
        .catch(console.error)


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.updatedUser
    default:
      return state
  }
}
