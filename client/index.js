import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import store from './store';
import Main from './components/Main';
import Home from './components/Home';
import ReadyContainer from './containers/ReadyContainer';
import ResultContainer from './containers/ResultContainer';
import $ from 'jquery';


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/ready" component={ReadyContainer} />
      </Route>
      <Route path="/result" component={ResultContainer} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
