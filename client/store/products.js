import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {products: []}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCT, products})

/**
 * THUNK CREATORS
 */
export const getProductsThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    const action = getProducts(data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {products: action.products}
    default:
      return state
  }
}

export default ProductReducer
