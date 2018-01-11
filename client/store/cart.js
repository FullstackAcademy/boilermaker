import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
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

/* THUNK */
export const postItem = (item) => {
  console.log('item', item);
  dispatch =>
    axios.post('/api/lineItems', item)
      .then(res => dispatch(addItem(res.data || defaultItems)))
      .catch(err => console.log(err))
}
  

/**
 * REDUCER
 */
export default function (state = defaultItems, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item]
    default:
      return state
  }
}
