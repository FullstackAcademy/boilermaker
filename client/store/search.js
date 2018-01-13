/**
 * ACTION TYPES
 */
const SEARCH = 'SEARCH'
/**
 * INITIAL STATE
 */
const defaultResults = []

/**
 * ACTION CREATORS
 */

export const search = searchResults => ({type: SEARCH, searchResults})


/**
 * REDUCER
 */
export default function (state = defaultResults, action) {
  switch (action.type) {
      case SEARCH:
        return action.searchResults
    default:
      return state
  }
}
