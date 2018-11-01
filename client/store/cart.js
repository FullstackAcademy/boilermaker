import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getCartProducts = products => ({type: GET_CART_PRODUCTS, products})
const addToCart = product => ({type: ADD_TO_CART, product})
/**
 * THUNK CREATORS
 */

export const getCartProductsThunk = cartId => {
  try {
    return async dispatch => {
      const {data} = await axios.get(`/api/cartProducts/${cartId}`)
      console.log(cartId)
      console.log('cart products data', data)
      const action = getCartProducts(data)
      dispatch(action)
    }
  } catch(err) {
    console.log(err)
  }
}

export const addToCartThunk = productId => {
  //this if sesssion has no cart id
  try {
    return async dispatch => {
      const newCartResponse = await axios.post('/api/carts', {})
      const currentCart = newCartResponse.data
      const newProductInCartResponse = await axios.post('/api/cartProducts', {
        productId,
        cartId: currentCart.id,
        quantity: 1
      })
      const newProductInCart = newProductInCartResponse.data
      const action = addToCart(newProductInCart)
      dispatch(action)
    }
  } catch (err) {
    console.log(err)
  }
  /**
   * If session has a cartId, we take out the first axios request, and currentCart = cart where id === req.session.cartId
   */
}

/**
 * REDUCER
 */

const CartReducer = (state = initialState, action ) => {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return [...state, action.products]
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return state
  }
}

export default CartReducer