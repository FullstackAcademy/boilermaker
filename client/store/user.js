import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const FIND_SINGLE_USER = 'FIND_SINGLE_USER'
const ALL_USERS = 'ALL_USERS'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_AS_ADMIN = 'REMOVE_AS_ADMIN'

/**
 * INITIAL STATE
 */
const initialState = {
  allUsers: [],
  user: {},
  loggedInUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const findSingleUser = user => ({type: FIND_SINGLE_USER, user})
const allUsers = users => ({type: ALL_USERS, users})
const updateUser = user => ({type: UPDATE_USER, user})
const removeAsAdmin = () => ({type: REMOVE_AS_ADMIN})

/**
 * THUNK CREATORS
 */
//custom thunks start
export const deleteUserThunk = (id, admin) => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    if (!admin.admin) {
      dispatch(removeUser())

      history.push('/login')
    } else {
      //dispatch(findSingleUser(admin.id))
      dispatch(removeAsAdmin())
      history.push(`/users/${admin.id}`)
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateUserThunk = user => async dispatch => {
  let res
  try {
    let userId = 0
    if (user.id) userId = user.id
    res = await axios.put(`/api/users/${userId}`, user)
  } catch (updateError) {
    return dispatch(updateUser({error: updateError}))
  }
  try {
    dispatch(updateUser(res.data))
    history.push(`/users/${user.id}`)
  } catch (error) {
    console.error(error)
  }
}
export const findSingleUserThunk = user => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${user}`)
    dispatch(findSingleUser(data[0]))
  } catch (error) {
    console.error(error)
  }
}

export const allUsersThunk = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(allUsers(res.data || initialState.allUsers))
  } catch (error) {
    console.error(error)
  }
}
//custom thunks end
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const signupAuth = (
  email,
  password,
  firstName,
  lastName,
  username
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/signup`, {
      firstName,
      lastName,
      email,
      password,
      username
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const loginAuth = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/login`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, loggedInUser: action.user}
    case REMOVE_USER:
      return {
        ...state,
        user: initialState.user,
        loggedInUser: initialState.user
      }
    case REMOVE_AS_ADMIN:
      return {
        ...state,
        user: initialState.user
      }
    case FIND_SINGLE_USER:
      return {...state, user: action.user}
    case ALL_USERS:
      return {...state, allUsers: action.users}
    case UPDATE_USER:
      return {...state, user: action.user}
    default:
      return state
  }
}
