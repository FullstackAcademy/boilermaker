import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {loginAuth} from '../store'
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
const login = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Navbar />
      <Grid textAlign="center" style={{height: '100vh'}} verticalAlign="middle">
        <Grid.Column id="loginform" style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={require('../../public/images/circle-cropped.png')} />Log-in
            to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit} name={name}>
            <Segment stacked>
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
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
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
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(loginAuth(email, password))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(login)

/**
 * PROP TYPES
 */
login.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
