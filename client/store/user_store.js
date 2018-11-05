import axios from 'axios'
import history from '../history'
import { getCartProductsThunk, getSessionCartId } from './cart_store'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * HELPER FUNCTIONS
 */

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

//create a new function that on login,
// check if user has a cartId or not.
// if (!cartId) create a cartId
// if (cartId) load cart

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    //if user doesn't exit
    return dispatch(getUser({error: authError}))
  }

  // check the user.cartId
  try {
    dispatch(getUser(res.data.user))
    /** we need to update 2 things in store state upon login: 
      * - Update the array of only products in the particular session's cart
      * - Update the cart id on session property
      */
    dispatch(getCartProductsThunk(res.data.cartId))
    dispatch(getSessionCartId(res.data.cartId))

    console.log('does res.data get sent?', res.data)
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}
export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
