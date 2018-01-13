// import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_LOCALITEMS = 'ADD_LOCALITEMS'
const GET_LOCALITEMS = 'GET_LOCALITEMS'
// const ADD_ACTIVE_ORDER = 'ADD_ACTIVE_ORDER'

/**
 * INITIAL STATE
 */
const defaultItems = []
// const activeOrder = {}

/**
 * ACTION CREATORS
 */
export const addLocalItems = (items) => ({
	type: ADD_LOCALITEMS,
	items
})

export const getLocalItems = () => ({
	type: GET_LOCALITEMS,
	items
})

// /* THUNK */
// export const postItem = (item) =>
//   dispatch =>
//     axios.post('/api/lineItems', item)
//     .then(res => {
//       return [].concat.apply([], res.data)
//     })
//       .then(lineItems => dispatch(addItem(lineItems || defaultItems)))
//       .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultItems, action) {
  switch (action.type) {
    case ADD_LOCALITEMS:
      return action.items
    case GET_LOCALITEMS:
      return action.items
    default:
      return state
  }
}
