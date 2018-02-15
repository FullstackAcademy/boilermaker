import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {Navbar} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes />
    </div>
  )
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default App


