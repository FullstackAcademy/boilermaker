import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import me from './me';
import messages from './messages';
import channels from './channels';
import currChannel from './currChannel';
import inactiveUser from './inactiveUser';
//import rtcConnection, {refresh} from './rtcConnection';

const reducer = combineReducers({
  me,
  messages,
  channels,
  currChannel,
  inactiveUser
  //rtcConnection,
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
export * from './currChannel';
export * from './inactiveUser';
//export * from './rtcConnection';