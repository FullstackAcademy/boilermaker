import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ACTIVE_ORDER = 'GOT_ACTIVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrders = []
const activeOrder = {}

/**
 * ACTION CREATORS
 */
const gotOrders = (orders) => ({
	type: GOT_ORDERS,
	orders
})

const gotActiveOrder = (activeOrder) => ({
	type: GOT_ACTIVE_ORDER,
	activeOrder
})

/**
 * THUNK CREATORS
 */
export const fetchOrders = (userId) =>
  dispatch =>
	axios.get(`/api/orders/${userId}`)
	.then(res => res.data)
	.then(results => {
		dispatch(gotOrders(results))
	})
	.catch(err => console.log(err))

export const fetchActiveOrder = (orderId) =>
  dispatch =>
	axios.get(`/api/orders/${orderId}/lineItems`)
	.then(res => res.data)
	.then(results => {
		console.log(results)
		dispatch(gotActiveOrder(results))
	})


/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return state
  }
}
