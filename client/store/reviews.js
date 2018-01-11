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
export const getReviewsWithAverageThunk = (productId) =>
  dispatch =>
    axios.get(`/api/reviews/${productId}`)
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
