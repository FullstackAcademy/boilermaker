import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RATING = 'GET_RATING'

/**
 * INITIAL STATE
 */
const defaultRating = null

/**
 * ACTION CREATORS
 */
const getRating = rating => ({type: GET_RATING, rating})

/**
 * THUNK CREATORS
 */
export const getRatingThunk = (productId) =>
  dispatch =>
    axios.get(`/api/reviews/${productId}/avgrating`)
      .then(res => {
        console.log('res is----------', res)
        dispatch(getRating(res.data || defaultRating))}
      )
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultRating, action) {
  switch (action.type) {
    case GET_RATING:
      return action.rating
    default:
      return state
  }
}
