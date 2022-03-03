import axios from 'axios'

// ACTION TYPES
const SET_PIZZAS = 'SET_PIZZAS'

// ACTION CREATORS
export const setPizzas = pizzas => {
  return {
    type: SET_PIZZAS,
    pizzas
  }
}

// THUNKS

export const fetchPizzas = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/pizzas')
      dispatch(setPizzas(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function pizzasReducer(state = [], action) {
  switch (action.type) {
    case SET_PIZZAS:
      return action.pizzas
    default:
      return state
  }
}
