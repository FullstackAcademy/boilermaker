import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import store from './store';
import Main from './components/Main';
import Home from './components/Home';
import ReadyContainer from './containers/ReadyContainer'


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <Route path="/home" component={Home} />
        <Route path="/ready" component={ReadyContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
