import { me } from './user';
import axios from 'axios';

//ACTION TYPES
const ADD_CART = 'ADD_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_PIZZA = 'DELETE_PIZZA'

//ACTION CREATORS
const _addCart = pizza => {
  return {
    type: ADD_CART,
    pizza
  }
}

export const updateCart = pizza => {
  return {
    type: UPDATE_CART,
    pizza
  }
}

export const deletePizza = id => {
  return {
    type: DELETE_PIZZA,
    id
  }
}

//THUNK CREATORS
export const addCart = (pizza) => {
  return async (dispatch) => {
    try {
      const {data: user} = await axios.get('/auth/me');
      const { data: result } = await axios.post(`/api/users/${user.id}`, pizza);
      if (result) {
        dispatch(_addCart(pizza));
      } else {
        throw new Error('Failed to add order item to the cart');
      }
    } catch (error) {
      console.log('Failed to add pizza to the cart');
    }
  }
}

/* When we add a pizza to the cart from the single pizza view, we add a quantity property to the object. We want the cart to group pizzas of the same type. If the pizza type is already in the cart, just update the quantity.
Ex: [{id: 1, name: margarita, ..., quantity: 1}]
*/
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_CART: {
      const prevPizzas = state.filter(pizza => pizza.id === action.pizza.id)
      if (prevPizzas.length > 0) {
        const newPizza = prevPizzas[0]
        newPizza.quantity += action.pizza.quantity
        return state.map(pizza => {
          if (pizza.id === newPizza.id) {
            return newPizza
          } else {
            return pizza
          }
        })
      } else {
        return [...state, action.pizza]
      }
    }
    case UPDATE_CART: {
      const newPizzas = state.map(pizza => {
        if (pizza.id === action.pizza.id) {
          return action.pizza
        } else {
          return pizza
        }
      })
      return newPizzas
    }
    case DELETE_PIZZA: {
      const newPizzas = state.filter(pizza => {
        return pizza.id !== action.id
      })
      return newPizzas
    }
    default:
      return state
  }
}
