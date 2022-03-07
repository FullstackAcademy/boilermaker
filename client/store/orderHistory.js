// unsure if we are gonna use this

import axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';

const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const getOrderHistory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/orderHistory')
      dispatch(getOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function orderHistory(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
