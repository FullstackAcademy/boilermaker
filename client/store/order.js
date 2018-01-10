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
// const activeOrder = {}

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
export const fetchOrders = (user) =>
  dispatch =>
	axios.get(`/api/orders/${user.id}`)
	.then(res => res.data)
	.then(results => {
		console.log(results)
		dispatch(gotOrders(results))
	})
	.catch(err => console.log(err))

// export const fetchActiveOrder = (order) =>
//   dispatch =>
// 	axios.get(`/api/orders/${order.id}/products`)
// 	.then(res => res.data)
// 	.then(results => {
// 		console.log(results)
// 		dispatch(gotActiveOrder(results))
// 	})


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
