import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import store from '../store'
import history from '../history'
import {me} from '../reducer/user'

// executes on page load - we only want to check this once
const whoAmI = store.dispatch(me())

// LOADER //

class Auth extends React.Component {

  componentDidMount () {
    whoAmI.then(() => {
      const {user} = store.getState()
      if (!user.id) {
        history.push('/login')
      }
    })
  }

  render () {
    const { isAuthenticated, Component, routeProps } = this.props
    return isAuthenticated ? <Component {...routeProps} /> : <div>Loading...</div>
  }
}

// CONTAINER //

const mapState = ({user}, {
  location,
  match,
  component: Component
}) => ({
  isAuthenticated: !!user.id,
  Component,
  routeProps: {
    location,
    match
  }
})

export default connect(mapState)(Auth)
