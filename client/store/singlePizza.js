import axios from 'axios'

const SET_PIZZA = 'SET_PIZZA'

const setPizza = pizza => {
  return {
    type: SET_PIZZA,
    pizza
  }
}

export const fetchPizza = id => {
  return async dispatch => {
    try {
      const {data: pizza} = await axios.get(`/api/pizzas/${id}`)
      dispatch(setPizza(pizza))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function pizzaReducer(state = {}, action) {
  switch (action.type) {
    case SET_PIZZA: {
      return action.pizza
    }
    default: {
      return state
    }
  }
}
