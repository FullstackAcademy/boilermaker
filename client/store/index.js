import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'

import pizzasReducer from './pizzas'
import pizzaReducer from './singlePizza'
import cartReducer from './cart'
import userReducer from './users'

// const reducer = combineReducers({user})

const reducer = combineReducers({
  user: auth,
  users: userReducer,
  pizzas: pizzasReducer,
  pizza: pizzaReducer,
  cart: cartReducer,


  // users: usersReducer,
  // orders: ordersReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
