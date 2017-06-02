import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../reducer/user'

// COMPONENT //

const AuthForm = props => {

  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{ displayName }</button>
        </div>
        {error && error.response && <div> { error.response.data } </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

// CONTAINER //

const mapLogin = ({user}) => ({
  name: 'login',
  displayName: 'Login',
  error: user.error
})

const mapSignup = ({user}) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: user.error
})

const mapDispatch = (dispatch, {history}) => ({
  handleSubmit (evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    dispatch(auth(email, password, formName, history))
  }
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

// TYPES //

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
