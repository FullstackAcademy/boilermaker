import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import me from './me';
import channels from './channels';
import categories from './categories';
import users from './users'
import room from './room';
// import timer from './timer';
// import messages from './messages';

const reducer = combineReducers({
  // messages,
  // timer,
  me,
  channels,
  categories,
  users,
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
export * from './room';
// export * from './timer';
// export * from './messages';
