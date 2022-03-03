import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

import pizzasReducer from './pizzas'
import pizzaReducer from './singlePizza'
import cartReducer from './cart'

// const reducer = combineReducers({user})

const reducer = combineReducers({
  pizzas: pizzasReducer,
  pizza: pizzaReducer,
  cart: cartReducer,
  user
  // users: usersReducer,
  // orders: ordersReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
