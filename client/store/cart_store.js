import axios from 'axios'
import {AvQueuePlayNext} from 'material-ui/svg-icons'

/**
 * ACTION TYPES
 */
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
const GET_SESSION_CART_ID = 'GET_SESSION_CART_ID'
const REMOVE_ITEM = 'REMOVE_ITEM'
/**
 * INITIAL STATE
 */
const initialState = {products: [], sessionCartId: 0}

/**
 * ACTION CREATORS
 */

const getCartProducts = products => ({type: GET_CART_PRODUCTS, products})
const addToCart = product => ({type: ADD_TO_CART, product})
const updateCart = product => ({type: UPDATE_CART, product})
const getSessionCartId = cartId => ({type: GET_SESSION_CART_ID, cartId})
const removeItem = id => ({type: REMOVE_ITEM, id})
/*
 HELPING FUNCTIONS
 */

const makeCartandAddProduct = async (productId, dispatch) => {
  console.log('case 1: make cart')
  const newCartResponse = await axios.post('/api/carts', {}) //instantiate a new cart
  const currentCart = newCartResponse.data
  // console.log('got here', currentCart)
  await axios.post('/api/cartProducts/session', {
    cartId: currentCart.id
  })
  const session = await axios.get('/api/cartProducts/session')
  // console.log('updated session unique123', session.data)
  dispatch(getSessionCartId(session.data.cartId))
  const newProductInCartResponse = await axios.post('/api/cartProducts', {
    productId,
    cartId: currentCart.id,
    quantity: 1
  })
  const newProductInCart = newProductInCartResponse.data
  const action = addToCart(newProductInCart)
  dispatch(action)
}

/* -------- If the product exists, increment quantitiy. Otherwise create a new instance of product.------- */
const justAddProductToExistingCart = async (
  productId,
  cart,
  dispatch,
  sessionCartId
) => {
  //Cart is an array of product objects, so existingCartProduct.length should be either 0 or 1
  try {
    const existingCartProduct = cart.filter(el => {
      return el.productId === productId
    })

    if (existingCartProduct.length) {
      console.log('case 2b: existing product, up quantitiy')
      //If product exists, update cartProduct quantity
      /**
       * sessionCartId.cartId is a poor naming convention!
       */
      const updated = await axios.put(
        `/api/cartProducts/${sessionCartId.cartId}/${productId}`,
        {
          quantity: existingCartProduct[0].quantity + 1
        }
      )

      dispatch(updateCart(updated.data))
    } else {
      console.log('case 2a: new product in existing cart')
      //If product doesn't exist, make a new cartProduct
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
 * THUNK CREATORS
 */

/* --------- Populate the state with cart products on the cart page-----------*/
export const getCartProductsThunk = cartId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cartProducts/${cartId}`)
      const action = getCartProducts(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

/*------- If there is no id in the session, make a cart and add a product in it.
Otherwise, add the product to existing cart,  --------*/
export const addToCartButtonThunk = (productId, cart) => {
  return async dispatch => {
    try {
      const sessionCartIdObj = await axios.get('/api/cartProducts/session')
      const sessionCartId = sessionCartIdObj.data
      if (!sessionCartId.cartId) {
        makeCartandAddProduct(productId, dispatch)
      } else {
        dispatch(getSessionCartId(sessionCartId.cartId))
        justAddProductToExistingCart(productId, cart, dispatch, sessionCartId)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const getCartIdThunk = () => {
  return async dispatch => {
    try {
      const cartIdObj = await axios.get('/api/cartProducts/session')
      const cartId = cartIdObj.data.cartId //cartId = 1
      dispatch(getSessionCartId(cartId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getSessionCartIdThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cartProducts/session')
      dispatch(getSessionCartId(data))
    } catch (err) {
      console.log(err)
    }
  }
}

//Remove Item

export const removeItemThunk = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cartProducts/${id}`)
      dispatch(removeItem(id))
    } catch (err) {
      console.log(err)
    }
  }
}

//Increment Quantity

export const incrementQuantityThunk = (productId, cartId) => {
  return async dispatch => {
    try {
      const productObj = await axios.get(
        `/api/cartProducts/${cartId}/${productId}`
      )
      const product = productObj.data
      const currentQuantity = product.quantity

      const updated = await axios.put(
        `/api/cartProducts/${cartId}/${productId}`,
        {
          quantity: currentQuantity + 1
        }
      )

      dispatch(updateCart(updated.data))
    } catch (err) {
      console.log(err)
    }
  }
}

//Decrement Quantity

export const decrementQuantityThunk = (productId, cartId, quantity) => {
  return async dispatch => {
    try {
      const productObj = await axios.get(
        `/api/cartProducts/${cartId}/${productId}`
      )
      const product = productObj.data
      const currentQuantity = product.quantity

      if (currentQuantity > 1) {
        const updated = await axios.put(
          `/api/cartProducts/${cartId}/${productId}`,
          {
            quantity: currentQuantity - 1
          }
        )

        dispatch(updateCart(updated.data))
      } else {
        dispatch(removeItem(product.productId))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return {...state, products: action.products}
    case ADD_TO_CART:
      return {...state, products: [...state.products, action.product]}
    case UPDATE_CART:
      const copy = [
        ...state.products.filter(el => {
          return el.productId !== action.product.productId
        }),
        action.product
      ]
      return {...state, products: copy}
    case GET_SESSION_CART_ID:
      return {...state, sessionCartId: action.cartId}
    case REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(
          product => product.productId !== action.id
        )
      }
    default:
      return state
  }
}

export default CartReducer
