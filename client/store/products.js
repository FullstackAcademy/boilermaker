import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCT, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const addToCart = product => ({type: ADD_TO_CART, product})

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

export const addProductThunk = info => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', info)
    const action = addProduct(data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.products
    case ADD_PRODUCT:
      return [...state.products, action.product]
    default:
      return state
  }
}

export default ProductReducer
