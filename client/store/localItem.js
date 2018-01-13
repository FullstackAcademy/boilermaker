
/**
 * ACTION TYPES
 */
const ADD_LOCALITEMS = 'ADD_LOCALITEMS'

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

/**
 * REDUCER
 */
export default function (state = defaultItems, action) {
  switch (action.type) {
    case ADD_LOCALITEMS:
      return action.items
    default:
      return state
  }
}
