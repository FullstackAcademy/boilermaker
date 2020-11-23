import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRACK = 'GET_TRACK'
const REMOVE_TRACK = 'REMOVE_TRACK'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getTrack = track => ({type: GET_TRACK, track})
export const removeTrack = () => ({type: REMOVE_TRACK})

/**
 * THUNK CREATORS
 */

export const fetchTrack = value => async dispatch => {
  try {
    const {data} = await axios.get(`/api/spotify/search/${value}`)
    dispatch(getTrack(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRACK:
      return action.track
    case REMOVE_TRACK:
      return initialState
    default:
      return state
  }
}
