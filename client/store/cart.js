import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const GET_ITEMS = 'GET_ITEMS'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
// const ADD_ACTIVE_ORDER = 'ADD_ACTIVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultItems = []
// const activeOrder = {}

/**
 * ACTION CREATORS
 */
export const addItem = (item) => ({
	type: ADD_ITEM,
	item
})

export const deleteItem = (itemId) => ({
	type: DELETE_ITEM,
	itemId
})

export const updateItem = (item) => ({
	type: UPDATE_ITEM,
	item
})

export const getItems = (items) => ({
  type: GET_ITEMS,
  items
})

/* THUNK */
export const postItem = (item) =>
  dispatch =>
    axios.post('/api/lineItems', item)
    .then(res => {
      return res.data
    })
      .then(data => {
        dispatch(addItem(data || defaultItems))
			})
      .catch(err => console.log(err))

export const deleteItemThunk = (itemId) =>
dispatch =>
  axios.delete(`/api/lineItems/${itemId}`)
  .then(res => {
    return res.data
  })
    .then(() => {
      dispatch(deleteItem(itemId))
    })
    .catch(err => console.log(err))

export const updateItemThunk = (itemId, quantity) =>
dispatch =>
  axios.put(`/api/lineItems/${itemId}`, {quantity: +quantity})
  .then(res => {
    return res.data
  })
    .then((updatedLineItem) => {
      dispatch(updateItem(updatedLineItem))
    })
    .catch(err => console.log(err))


export const fetchItems = (orderId) =>
  dispatch => {
    axios.get(`/api/lineItems/${orderId}`)
    .then(res => {
      return res.data})
    .then(lineItems => dispatch(getItems(lineItems)))
    .catch(err => console.log(err))
  }


/**
 * REDUCER
 */
export default function (state = defaultItems, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    case DELETE_ITEM:
      let items = state.filter(item => item.id !== +action.itemId)
      return items
    case UPDATE_ITEM:
    let updateItems = state.filter(item => item.id !== +action.item.id)
    return [...updateItems, action.item]
    case GET_ITEMS:
      return action.items
    default:
      return state
  }
}
