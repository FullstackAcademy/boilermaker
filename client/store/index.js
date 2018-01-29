import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user';
import messages from './messages';
import channels from './channels';
import currChannel from './currChannel';
//import rtcConnection, {refresh} from './rtcConnection';

const reducer = combineReducers({
  user,
  messages,
  channels,
  currChannel,
  //rtcConnection,
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
));

const store = createStore(reducer, middleware)

export default store;
export * from './user';
export * from './messages';
export * from './channels';
export * from './currChannel';
//export * from './rtcConnection';