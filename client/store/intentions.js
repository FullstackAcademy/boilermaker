import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_INTENTIONS = 'GET_INTENTIONS'
const REMOVE_INTENTIONS = 'REMOVE_INTENTIONS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getIntentions = intentions => ({type: GET_INTENTIONS, intentions})
export const removeIntentions = () => ({type: REMOVE_INTENTIONS})

/**
 * THUNK CREATORS
 */

export const fetchIntentions = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/mood`)
    dispatch(getIntentions(data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INTENTIONS:
      return action.intentions
    case REMOVE_INTENTIONS:
      return initialState
    default:
      return state
  }
}
