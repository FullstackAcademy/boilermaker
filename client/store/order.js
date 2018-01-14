import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'

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
