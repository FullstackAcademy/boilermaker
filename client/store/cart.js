import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART = 'UPDATE_CART'
/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const getCartProducts = products => ({type: GET_CART_PRODUCTS, products})
const addToCart = product => ({type: ADD_TO_CART, product})
const updateCart = product => ({type: UPDATE_CART, product})

/*
 HELPING FUNCTIONS
 */

const makeCartandAddProduct = async (productId, cart, dispatch) => {
  const newCartResponse = await axios.post('/api/carts', {}) //instantiate a new cart
  const currentCart = newCartResponse.data
  await axios.post('/api/cartProducts/session', {cartId: currentCart.id})

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
    console.log(
      'cartproduct instance after filtering, should only contain one product w correct productid',
      existingCartProduct
    )
    if (existingCartProduct.length) {
      //If product exists, update cartProduct quantity
      const updated = await axios.put(`/api/cartProducts/${productId}`, {
        quantity: existingCartProduct[0].quantity + 1
      })
      console.log('updated cp instance, quantity should be > 1', updated)
      dispatch(updateCart(updated.data))
    } else {
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
    next(err)
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
        console.log(
          'making new cart instance and updating session.cartId accordingly (session.cartId not existing previously)'
        )
        makeCartandAddProduct(productId, cart, dispatch)
      } else {
        console.log('adding product to existing cart')
        console.log('cart being passed in', cart)
        justAddProductToExistingCart(productId, cart, dispatch, sessionCartId)
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
      return [...state, action.products]
    case ADD_TO_CART:
      return [...state, action.product]
    case UPDATE_CART:
      return [
        ...state.filter(el => {
          return el.productId !== action.product.productId
        }),
        action.product
      ]
    default:
      return state
  }
}

export default CartReducer
