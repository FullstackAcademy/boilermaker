import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {Link} from 'react-router-dom'

const LoginForm = () => {
  return (
    <div className="auth-form">
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Enter your Email to login
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
        <Link to="/signup">
          <Button variant="warning">Click here to sign up!</Button>
        </Link>
      </Form>
    </div>
  )
}

export default LoginForm
