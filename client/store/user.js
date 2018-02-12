import axios from 'axios'
import history from '../history'
import { fetchOrders, fetchUnAuthOrders } from './order'
import { fetchUnAuthenticatedUser, createUnAuthenticatedUser } from './unAuthUser'
import {postItem, addLocalItems, fetchItems} from '../store'
import { getUniqueKey } from '../helper'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GOT_UNAUTH_USER = 'GOT_UNAUTH_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const gotUnAuthUser = user => ({type: GOT_UNAUTH_USER, user})
/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
				if(res.data) { //if user is logged in
					dispatch(getUser(res.data || defaultUser))
					dispatch(fetchOrders(res.data.id))
				} else { //if not logged in, look for unauth user.

					//if they arent a user but have a sessionId, meaning they exist in unauth users..
					if(localStorage.getItem('sessionId')) {
						const thunk = fetchUnAuthenticatedUser(localStorage.getItem('sessionId'))
						dispatch(thunk)
					} else { //they dont exist as either type of user, create an unauth user..
						localStorage.setItem('sessionId', getUniqueKey())
						const thunk = createUnAuthenticatedUser(localStorage.getItem('sessionId'))
						dispatch(thunk)
					}
				}
			})
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
				//get their orders and shopping cart.
				dispatch(fetchOrders((res.data.id)))
        history.push('/')
        return res.data
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .then((user)=> {
        // console.log('user is-------', user)
        const allLocalItems = localStorage.getArr('item')
        const userId = user.id
        allLocalItems.map(localItem=> {
          dispatch(postItem({...localItem, userId }))
        })
        dispatch(fetchItems(userId))
        localStorage.removeItem("item");
        const LocalItems = localStorage.getArr('item')
        dispatch(addLocalItems(LocalItems));
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
