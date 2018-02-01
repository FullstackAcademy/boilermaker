import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import me from './me';
import messages from './messages';
import channels from './channels';
import users from './users'
import timer from './timer';

const reducer = combineReducers({
  me,
  messages,
  channels,
  users,
  timer
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));

const store = createStore(reducer, middleware)

export default store;
export * from './me';
export * from './messages';
export * from './channels';
export * from './users';
