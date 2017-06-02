import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import store from '../store'
import {me} from '../reducer/user'

// executes on page load - we only want to check this once
const whoAmI = store.dispatch(me())

// LOADER //

class Auth extends React.Component {

  componentDidMount () {
    whoAmI.then(() => {
      const { user } = store.getState()
      const { routeProps: { history } } = this.props
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

const mapState = ({ user }, {
  history,
  location,
  match,
  component: Component
}) => ({
  isAuthenticated: !!user.id,
  Component,
  routeProps: {
    history,
    location,
    match
  }
})

export default connect(mapState)(Auth)
