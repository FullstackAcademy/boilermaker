import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const CREATED_REVIEW = 'CREATED_REVIEW'
/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const createdReview = review => ({type: CREATED_REVIEW, review})
/**
 * THUNK CREATORS
 */
export const getReviewsWithAverageThunk = (productId) =>
  dispatch =>
    axios.get(`/api/reviews/${productId}`)
      .then(res => dispatch(getReviews(res.data || defaultReviews)))
      .catch(err => console.log(err))

export const createReview = (review) =>
  dispatch =>
    axios.post(`/api/reviews`, review)
      .then(res => dispatch(createdReview(res.data)))
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
		case CREATED_REVIEW:
      return [...state.reviews, action.review]
    default:
      return state
  }
}
