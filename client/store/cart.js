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
const AddItem = (item) => ({
	type: ADD_ITEM,
	item
})

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
