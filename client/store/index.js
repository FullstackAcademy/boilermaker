import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import categories from './category'
import products from './product'
import orders from './order'
import cartItems from './cart'
import reviews from './reviews'
import localItems from './localItem'
import activeOrder from './singleOrder'
import unAuthUser from './unAuthUser'
import users from './userList'

const reducer = combineReducers({user, categories, products, orders, activeOrder, cartItems, reviews, localItems, unAuthUser, users})

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
export * from './localItem'
export * from './singleOrder'
export * from './userList'
