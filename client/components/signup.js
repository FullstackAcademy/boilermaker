import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signupAuth} from '../store'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react'
import {Navbar} from '.'
import {Footer} from './footer'

/**
 * COMPONENT
 */
const signup = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Navbar />
      <Grid textAlign="center" style={{height: '100vh'}} verticalAlign="middle">
        <Grid.Column id="signupform" style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={require('../../public/images/circle-cropped.png')} />{' '}
            Sign up to create your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked id="signupbackground">
              <Form.Input
                name="username"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="username"
              />
              <Form.Input
                name="firstName"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
                type="firstName"
              />
              <Form.Input
                name="lastName"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
                type="lastName"
              />
              <Form.Input
                name="email"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                type="Email"
              />
              <Form.Input
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button type="submit" color="teal" fluid size="large">
                Sign Up!
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <Footer />
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const username = evt.target.username.value
      dispatch(signupAuth(email, password, firstName, lastName, username))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(signup)

/**
 * PROP TYPES
 */
signup.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
