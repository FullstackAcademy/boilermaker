import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup } from './components';

const getMe = () => {

};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} onEnter={getMe}>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <IndexRoute component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
