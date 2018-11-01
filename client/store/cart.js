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
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cartProducts/${cartId}`)
      console.log(cartId)
      console.log('cart products data', data)
      const action = getCartProducts(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

export const addToCartThunk = productId => {
  //this if sesssion has no cart id
  return async dispatch => {
    try {
      const sessionCartIdObj = await axios.get('/api/cartProducts/session')
      const sessionCartId = sessionCartIdObj.data

      console.log('sessionCartId: ', sessionCartId)
      if (!sessionCartId.cartId) {
        //enters this block when cartId is null
        console.log('we need to make a new cart!')
        const newCartResponse = await axios.post('/api/carts', {}) //instantiate a new cart
        const currentCart = newCartResponse.data
        console.log('we got to setting cartId on session')
        await axios.post('/api/cartProducts/session1', {cartId: currentCart.id})
        const newProductInCartResponse = await axios.post('/api/cartProducts', {
          productId,
          cartId: currentCart.id,
          quantity: 1
        })
        const newProductInCart = newProductInCartResponse.data
        const action = addToCart(newProductInCart)
        dispatch(action)
      } else {
        //if store.state.contains(productId)
        console.log('we need to add product to an existing cart')
        const newProductInCartResponse = await axios.post('/api/cartProducts', {
          productId,
          cartId: sessionCartId.cartId,
          quantity: 1
        })
        const newProductInCart = newProductInCartResponse.data
        const action = addToCart(newProductInCart)
        dispatch(action)
      }
    } catch (err) {
      console.log(err)
    }
  }
  /**
   * If session has a cartId, we take out the first axios request, and currentCart = cart where id === req.session.cartId
   */
}

/**
 * REDUCER
 */

const CartReducer = (state = initialState, action) => {
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
