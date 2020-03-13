import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_TOKEN = 'GOT_TOKEN'

/**
 * INITIAL STATE
 */
const defaultState = null

/**
 * ACTION CREATORS
 */
const gotToken = token => ({type: GOT_TOKEN, token})

/**
 * THUNK CREATORS
 */
export const fetchToken = () => async dispatch => {
  try {
    const res = await axios.get('/auth/mapbox')
    dispatch(gotToken(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_TOKEN:
      return action.token
    default:
      return state
  }
}
