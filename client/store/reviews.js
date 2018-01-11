import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({type: GET_REVIEWS, reviews})

/**
 * THUNK CREATORS
 */
export const getReviewsThunk = () =>
  dispatch =>
    axios.get('/api/reviews')
      .then(res => dispatch(getReviews(res.data || defaultReviews)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    default:
      return state
  }
}
