import axios from 'axios'
import history from '../history'
import { fetchOrders, fetchUnAuthOrders } from './order'
import { getUniqueKey } from '../helper'
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
 export const createUnAuthenticatedUser = (localStorageId) => {
 	return (dispatch) => {
 		axios.post('/api/unAuthenticated', {sessionId: localStorageId})
 		.then(res => {
 			console.log(res)
 			return res.data
 		})
 		.then(data => {
 			if(data) {
 					dispatch(gotUnAuthUser(data))
					dispatch(fetchUnAuthOrders(data.sessionId))
 			}
 		})
		.catch(err => console.log(err))
 	}
 }

export const fetchUnAuthenticatedUser = (localStorageId) => {
	return (dispatch) => {
		axios.get('/api/unAuthenticated/' + localStorageId)
		.then(res => {
			console.log(res)
			return res.data
		})
		.then(data => {
			if(data) {
					dispatch(gotUnAuthUser(data))
					dispatch(fetchUnAuthOrders(data.sessionId))
			}

		})
	}
}


/**
 * REDUCER
 */
export default function (state = defaultUnAuthUser, action) {
  switch (action.type) {
    case GOT_UNAUTH_USER:
      return action.unAuthUser
    default:
      return state
  }
}
