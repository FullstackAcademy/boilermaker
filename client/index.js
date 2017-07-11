import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {Route} from 'react-router-dom'
import store from './store'
import history from './history'
import {Main, Auth, Login, Signup, UserHome} from './components'

const AuthRoute = props => (
  <Route
    path={props.path}
    render={
      routeProps => <Auth {...routeProps} {...props} />
    }
  />
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Main>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <AuthRoute path="/home" component={UserHome} />
        </div>
      </Main>
    </Router>
  </Provider>,
  document.getElementById('app')
)
