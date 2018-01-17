import axios from 'axios'
import { getItems } from './cart'
import { gotActiveOrder } from './singleOrder'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'
const GET_ORDER = 'GET_ORDER'
const CREATED_ORDER = 'CREATED_ORDER'
const FULLFILLED_ORDER = 'FULLFILLED_ORDER'
/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const gotOrders = (orders) => ({
	type: GOT_ORDERS,
	orders
})

const getOrder = (order) => ({
	type: GET_ORDER,
	order
})

const createdOrder = (order) => ({
	type: CREATED_ORDER,
	order
})

const fullFilledOrder = (order) => ({
	type: FULLFILLED_ORDER,
	order
})
/**
 * THUNK CREATORS
 */


export const postOrder = (id) =>
	dispatch =>
		axios.post(`/api/orders`, {
			userId: id,
		})
		.then(res => res.data)
		.then(result => {
			dispatch(gotActiveOrder(result))
		})
		.catch(err => console.log(err))

export const postUnAuthOrder = (unAuthId) =>
	dispatch =>
		axios.post(`/api/orders`, {
			sessionId: unAuthId,
		})
		.then(res => res.data)
		.then(result => {
			dispatch(gotActiveOrder(result))
		})
		.catch(err => console.log(err))

export const fetchOrders = (userId) =>
  dispatch =>
	axios.get(`/api/orders/${userId}`)
	.then(res => res.data)
	.then(results => {
		let completedOrders = results.filter(order => order.isFullfilled)
		let cart = results.filter(order => !order.isFullfilled)
		dispatch(gotOrders(completedOrders || defaultOrders))
		if (cart.length === 1) {
			let items = cart[0].lineItems
			dispatch(getItems(items))
			dispatch(gotActiveOrder(cart[0]))
		} else if (cart.length === 0){
			dispatch(postOrder(userId))//create new unfulfilled order(shoppingcart)
		} else {
			console.log('error with finding shopping cart')
		}
	})
	.catch(err => console.log(err))

export const fetchUnAuthOrders = (unAuthId) =>
  dispatch =>
	axios.get(`/api/orders/unAuthenticated/${unAuthId}`)
	.then(res => res.data)
	.then(results => {
		let completedOrders = results.filter(order => order.isFullfilled)
		let cart = results.filter(order => !order.isFullfilled)
		dispatch(gotOrders(completedOrders || defaultOrders))
		if (cart.length === 1) {
			let items = cart[0].lineItems
			dispatch(getItems(items))
			dispatch(gotActiveOrder(cart[0]))
		} else if (cart.length === 0){
			dispatch(postUnAuthOrder(unAuthId))//create new unfulfilled order(shoppingcart)
		} else {
			console.log('error with finding shopping cart')
		}
	})
	.catch(err => console.log(err))

export const fullFillOrder = (orderId, props) =>
  dispatch =>
	axios.put(`/api/orders`, {orderId})
	.then(res => res.data)
	.then(result => {
		console.log('updated order', result)
		dispatch(getItems([]))
		dispatch(getOrder(result))
		if (props.user.id) {
			dispatch(postOrder(props.user.id))
			history.push(`/orders-history`)
		} else if (props.unAuthUser.sessionId){
			dispatch(postUnAuthOrder(props.unAuthUser.sessionId))
			history.push(`/`)
		}
	})
	.catch(err => console.log(err))
/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GOT_ORDERS:
			return action.orders
		case GET_ORDER:
			return [...state, action.order]
		case CREATED_ORDER:
			return [...state, action.order]
		// case GOT_ACTIVE_ORDER:
		// 	return action.activeOrder
    default:
      return state
  }
}
