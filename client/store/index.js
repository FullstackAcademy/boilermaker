import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import me from './me';
import channels from './channels';
import categories from './categories';
import users from './users'
import reaction from './reaction';
import room from './room';

const reducer = combineReducers({
  me,
  channels,
  categories,
  users,
  reaction,
  room
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));

const store = createStore(reducer, middleware)

export default store;
export * from './me';
export * from './channels';
export * from './categories';
export * from './users';
export * from './reaction';
export * from './room';
