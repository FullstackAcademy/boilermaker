import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const GET_ITEMS = 'GET_ITEMS'
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

export const getItems = (items) => ({
  type: GET_ITEMS,
  items
})

/* THUNK */
export const postItem = (item) =>
  dispatch =>
    axios.post('/api/lineItems', item)
    .then(res => {
      return [].concat.apply([], res.data)
    })
      .then(lineItems => dispatch(addItem(lineItems || defaultItems)))
      .catch(err => console.log(err))

export const fetchItems = (userId) =>
  dispatch =>
    axios.get(`/api/lineItems/${userId}`)
    .then(res => {
      console.log('fetached res is-------------', res.data)
      return res.data})
    .then(lineItems => dispatch(getItems(lineItems)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultItems, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, ...action.item]
    case GET_ITEMS:
      return action.items
    default:
      return state
  }
}
