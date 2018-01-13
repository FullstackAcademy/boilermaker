import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import categories from './category'
import products from './product'
import orders from './order'
import cartItems from './cart'
import searchResults from './search'
import reviews from './reviews'

const reducer = combineReducers({user, categories, products, orders, cartItems, reviews, searchResults})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './category'
export * from './product'
export * from './order'
export * from './cart'
export * from './reviews'
export * from './search'

