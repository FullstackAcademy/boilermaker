import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { Main, Auth, Login, Signup, UserHome } from './components';

const AuthRoute = props => (
  <Route path={props.path} render={routeProps => <Auth {...routeProps} {...props}  /> } />
);

const SummerHome = () => <div>Beach!</div>

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <AuthRoute path="/home" component={UserHome} />
          <AuthRoute path="/summer-home" component={SummerHome} />
        </div>
      </Main>
    </Router>
  </Provider>,
  document.getElementById('app')
);
