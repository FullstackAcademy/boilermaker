import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PlAYLISTS = 'GET_PlAYLISTS'
const REMOVE_PlAYLISTS = 'REMOVE_PlAYLISTS'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const getPlaylists = playlists => ({type: GET_PlAYLISTS, playlists})
export const removePlaylists = () => ({type: REMOVE_PlAYLISTS})

/**
 * THUNK CREATORS
 */

export const fetchPlaylists = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/spotify/playlists/${userId}`)
    dispatch(getPlaylists(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PlAYLISTS:
      return action.playlists
    case REMOVE_PlAYLISTS:
      return initialState
    default:
      return state
  }
}
