import axios from 'axios';
import store from './index';

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_CART = 'ADD_CART'
const UPDATE_CART = 'UPDATE_CART'
const DELETE_PIZZA = 'DELETE_PIZZA'

//ACTION CREATORS
export const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}
const _addCart = item => {
  return {
    type: ADD_CART,
    item
  }
}
const _updateCart = item => {
  return {
    type: UPDATE_CART,
    item
  }
}

const _deletePizza = id => {
  return {
    type: DELETE_PIZZA,
    id
  }
}

//THUNK CREATORS

//NOTE: MOVED TEMPORARILY (MAYBE) TO THE ViewUserPage COMPONENT HOOK. WHENEVER THE HOME PAGE LOADS, THE CART IS RETRIEVED. HOWEVER, WE WANT TO GET THE CART DURING THE LOGIN PROCESS.
// export const getCart = (userId) => {
//   return async (dispatch) => {
//     try {
//       const { data: cart } = await axios.get(`/api/orderItems?userId=${userId}`);
//       dispatch(_getCart(cart));
//     } catch (error) {
//       console.error("Failed to retrieve the user's cart", error);
//     }
//   }
// }

export const addCart = (newPizza) => {
  return async (dispatch) => {
    try {
      // const { data: user } = await axios.get('/auth/thisUser');
      const user = store.getState().user;
      console.log('user', user);
      console.log(user);
      const { data: newOrderItem } = await axios.post('/api/orderItems', {user, newPizza});
      if (newOrderItem) {
        dispatch(_addCart(newOrderItem));
      }
    } catch (error) {
      console.error('Failed to add pizza to the cart', error);
    }
  }
}

export const updateOrderItem = (pizza) => {
  return async (dispatch) => {
    try {
      const {data: newOrderItem} = await axios.put(`/api/orderItems/${pizza.id}`, pizza);
      if (newOrderItem) {
        dispatch(_updateCart(newOrderItem));
      }
    } catch (error) {
      console.error('Failed to update the pizza', error);
    }
  }
}

export const deletePizza = (id) => {
  return async (dispatch) => {
    try {
      const { data: result } = await axios.delete(`/api/orderItems/${id}`);
      if (result) {
        dispatch(_deletePizza(id));
      }
    } catch (error) {
      console.error('Failed to delete item from the cart', error);
    }
  }
}

/* When we add a pizza to the cart from the single pizza view, we add a quantity property to the object. We want the cart to group pizzas of the same type. If the pizza type is already in the cart, just update the quantity.
Ex: [{id: 1, name: margarita, ..., quantity: 1}]
*/
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GET_CART: {
      return action.cart;
    }
    case ADD_CART: {
      const newCart = [...state, action.item];
      return newCart;
    }
    case UPDATE_CART: {
      const newCart = state.map(item => {
        if (item.id === action.item.id) {
          return action.item;
        } else {
          return item;
        }
      });
      return newCart;
    }
    case DELETE_PIZZA: {
      const newCart = state.filter(item => {
        return item.id !== action.id
      })
      return newCart;
    }
    default:
      return state;
  }
}
