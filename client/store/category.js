import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const CREATED_CATEGORY = 'CREATED_CATEGORY'
/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})
const createdCategory = category => ({type: CREATED_CATEGORY, category})

/**
 * THUNK CREATORS
 */
export const getCategoriesThunk = () =>
  dispatch =>
    axios.get('/api/category')
      .then(res => dispatch(getCategories(res.data || defaultCategories)))
      .catch(err => console.log(err))

export const createCategoryThunk = (category) =>
  dispatch =>
    axios.post('/api/category', category)
      .then(res => dispatch(createdCategory(res.data)))
      .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultCategories, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
		case CREATED_CATEGORY:
			return [...state, action.category]
    default:
      return state
  }
}
