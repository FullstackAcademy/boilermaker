import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialState = {products: [], product: {}}

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})

/**
 * THUNK CREATORS
 */

export const getSingleProductThunk = id => {
  return async dispatch => {
    console.log("i'm trying")
    const {data} = await axios.get('/api/products/' + id)
    console.log('this is the data', data)
    const action = getProduct(data)
    dispatch(action)
  }
}
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
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case GET_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}

export default ProductReducer
