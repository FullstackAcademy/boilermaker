/**
 * ACTION TYPES
 */
const CLEAR_SEARCH = 'CLEAR_SEARCH'
/**
 * INITIAL STATE
 */
const defaultTerm = false

/**
 * ACTION CREATORS
 */

export const clearSearch = searchTerm => ({type: CLEAR_SEARCH, searchTerm})


/**
 * REDUCER
 */
export default function (state = defaultTerm, action) {
  switch (action.type) {
      case CLEAR_SEARCH:
        console.log('dddddd', action.searchTerm)
        return action.searchTerm
    default:
      return state
  }
}
