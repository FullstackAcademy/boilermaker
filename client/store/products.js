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
const initialState = {all: [], single: {}}
const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * ACTION CREATORS
 */

const getProduct = product => ({type: GET_PRODUCT, product})
const getProducts = products => ({type: GET_PRODUCTS, products})
const addProduct = product => ({type: ADD_PRODUCT, product})
const addToCart = product => ({type: ADD_TO_CART, product})

/**
 * THUNK CREATORS
 */

export const getSingleProductThunk = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${id}`)
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
    case GET_PRODUCTS:
      return {...state, all: action.products}
    case GET_PRODUCT:
      return {...state, single: action.product}
    case ADD_PRODUCT:
      return {...state, all: [...state.all, action.product]}
    default:
      return state
  }
}

export default ProductReducer
