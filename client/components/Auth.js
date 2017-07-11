import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import store from '../store'
import history from '../history'
import {me} from '../reducer/user'

/**
 * This only executes once, during our app's initial load!
*/
const whoAmI = store.dispatch(me())

/**
 * The 'AuthChecker' component has a simple role:
 * it resolves the whoAmI promise and checks the user on
 * the state. If there is no user (which we determine by
 * checking to see if user.id is falsey, we redirect to
 * login)
*/
class AuthChecker extends React.Component {

  componentDidMount () {
    whoAmI.then(() => {
      const {user} = store.getState()
      if (!user.id) {
        history.push('/login')
      }
    })
  }

  render () {
    const {isAuthenticated, Component, routeProps} = this.props
    return isAuthenticated ? <Component {...routeProps} /> : <div>Loading...</div>
  }
}

// CONTAINER //
const mapState = ({user}, {
  location,
  match,
  history,
  component: Component
}) => ({
  isAuthenticated: !!user.id,
  Component,
  routeProps: {
    location,
    match,
    history
  }
})

const AuthContainer = connect(mapState)(AuthChecker)


// Auth => Route => AuthContainer => Component passed down as a prop to Auth
const Auth = props => (
  <Route
    path={props.path}
    render={
      routeProps => <AuthContainer {...routeProps} {...props} />
    }
  />
)

export default Auth
