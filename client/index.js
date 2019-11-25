import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// establishes socket connection
import './socket'
import {Footer} from './components'

ReactDOM.render(
  <Provider store={store}>
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
    />
    <Router history={history}>
      <App />
      <Footer />
    </Router>
  </Provider>,
  document.getElementById('app')
)
