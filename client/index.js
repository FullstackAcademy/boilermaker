import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import {Route} from 'react-router-dom'
import store from './store'
import history from './history'
import {Main, Auth, Login, Signup, UserHome} from './components'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Main>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Auth path="/home" component={UserHome} />
        </div>
      </Main>
    </Router>
  </Provider>,
  document.getElementById('app')
)
