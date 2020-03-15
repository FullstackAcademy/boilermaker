import axios from 'axios'
import history from '../history'

/*
 * ACTION TYPES
 */
const GOT_EVENTS = 'GOT_EVENTS'

/**
 * INITIAL STATE
 */
const defaultEvents = {}

/**
 * ACTION CREATORS
 */
const gotEvents = events => ({type: GOT_EVENTS, events})

/**
 * THUNK CREATORS
 */
export const fetchEvents = () => async dispatch => {
  try {
    const {data} = await axios.get('/events')
    dispatch(gotEvents(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultEvents, action) {
  switch (action.type) {
    case GOT_EVENTS:
      return action.events
    default:
      return state
  }
}
