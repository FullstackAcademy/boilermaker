import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const EditUserPage = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Change email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder=" Change Password" />
        </Form.Group>
        <InputGroup className="mb-3">
          <InputGroup.Text>First and last name</InputGroup.Text>
          <FormControl aria-label="First name" />
          <FormControl aria-label="Last name" />
        </InputGroup>
        {/* <Button variant="primary" type="submit">
          Submit
        </Button> */}
      </Form>
    </div>
  )
}

export default EditUserPage
