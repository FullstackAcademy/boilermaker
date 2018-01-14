import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ACTIVE_ORDER = 'GOT_ACTIVE_ORDER'

/**
 * INITIAL STATE
 */
const activeOrder = {}

/**
 * ACTION CREATORS
 */

const gotActiveOrder = (activeOrder) => ({
	type: GOT_ACTIVE_ORDER,
	activeOrder
})

/**
 * THUNK CREATORS
 */

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
export default function (state = activeOrder, action) {
  switch (action.type) {
    case GOT_ACTIVE_ORDER:
        console.log('reducer activeOrder ----', action.activeOrder)
        return action.activeOrder
    default:
      return state
  }
}
