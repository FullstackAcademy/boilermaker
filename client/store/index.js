import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducer';

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);
