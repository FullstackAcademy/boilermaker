import axios from 'axios'
import history from '../history'
import { fetchOrders } from './order'
import {postItem, addLocalItems, fetchItems} from '../store'
/**
 * ACTION TYPES
 */
const GOT_UNAUTH_USER = 'GOT_UNAUTH_USER'
/**
 * INITIAL STATE
 */
const defaultUnAuthUser = {}

/**
 * ACTION CREATORS
 */
const gotUnAuthUser = unAuthUser => ({type: GOT_UNAUTH_USER, unAuthUser})
/**
 * THUNK CREATORS
 */

export const fetchUnAuthenticatedUser = (localStorageId) => {
	return (dispatch) => {
		axios.post('/unAuthenticated/', localStorageId)
		.then(res => {
			console.log(res)
			return res.data
		})
		.then(data => {
			dispatch(gotUnAuthUser(data))
		})
	}
}


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
