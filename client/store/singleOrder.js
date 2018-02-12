import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GOT_ACTIVE_ORDER = 'GOT_ACTIVE_ORDER'

/**
 * INITIAL STATE
 */
const activeOrder = {}

/**
 * ACTION CREATORS
 */

export const gotActiveOrder = (activeOrder) => ({
	type: GOT_ACTIVE_ORDER,
	activeOrder
})

/**
 * THUNK CREATORS
 */

// OLDER VER
// export const fetchActiveOrder = (orderId) =>
//   dispatch =>
// 	axios.get(`/api/orders/${orderId}/lineItems`)
// 	.then(res => res.data)
// 	.then(result => {
//       console.log('wtf=====',result);
//       const allProducts = result.lineItems.map(lineItem => {
//         return axios.get(`/api/products/lineItems/${lineItem.id}`)
//       })
//       Promise.all(allProducts)
//       .then(res => {
//         console.log('allProducts===== ',res)
//         let products = []
//         res.forEach(e => products.push(e.data[0]))
//         result['products'] = products
//         dispatch(gotActiveOrder(result))
//       })
//       .catch(err => console.error(err))
//   })

  export const fetchActiveOrder = (orderId) =>
  dispatch =>
	axios.get(`/api/orders/${orderId}/lineItems`)
	.then(res => res.data)
	.then(result => {
      console.log('wtf=====',result);
      dispatch(gotActiveOrder(result))
  })
  .catch(err => console.error(err))


/**
 * REDUCER
 */
export default function (state = activeOrder, action) {
  switch (action.type) {
    case GOT_ACTIVE_ORDER:
        return action.activeOrder
    default:
      return state
  }
}
