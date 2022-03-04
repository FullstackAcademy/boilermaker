import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { DropdownButton, Dropdown, Row, Col, FloatingLabel } from "react-bootstrap";


class Checkout extends React.Component {

  render() {
  return (
    <div>
    <div className="shippingaddress">
      <Form>
        <Form.Label>Shipping Address</Form.Label>
        <Form.Group>
          <FloatingLabel label="Email address"> 
            <Form.Control
              name="email"
              type="text"
              placeholder="Enter email"
              required
            />
            </FloatingLabel>
        </Form.Group>

         <Form.Group>
          <FloatingLabel label="Street Address">
           
        
          <Form.Control 
          name="streetaddress"
          type="text"
          placeholder="Enter you Address"
          required
          />
            </FloatingLabel>
        </Form.Group>
        <Row>
          <Col>
        <Form.Group>
          <FloatingLabel label="Postal/Zip Code">
          <Form.Control 
          name="postal/zip/code"
          type="text"
          placeholder="Postal/Zip Code"
          required
          />
          </FloatingLabel>
        </Form.Group>
        </Col>

        <Col>
        <Form.Group>
          <FloatingLabel label="City">
            
          
          <Form.Control 
          name="city"
          type="text"
          placeholder="City"
          required
          />
          </FloatingLabel>
        </Form.Group>
        </Col>


        <Col>
        <Form.Group>
          <FloatingLabel label="State">
        
          
          <Form.Control 
          name="state"
          type="text"
          placeholder="Province/State"
          required
          />
          </FloatingLabel>
        </Form.Group>
        </Col>
        </Row>
        <Button variant="primary" type="submit">
            Save
          </Button>
      </Form>
      </div>

      <div>
      <Form title="Payment Informtion">
         <Form.Label>Payment Information</Form.Label>
        <Row>
          <Col>
        <Form.Group>
          <FloatingLabel label="Name on Card">
            <Form.Control
              name="cardname"
              type="text"
              placeholder="Name on Card"
              required
            />
            </FloatingLabel>
        </Form.Group>
        </Col>
        <Col>
        <DropdownButton id="dropdown-basic-button" title="Card">
          <Dropdown.Item>Visa</Dropdown.Item>
          <Dropdown.Item>MasterCard</Dropdown.Item>
          <Dropdown.Item>Amex</Dropdown.Item>
        </DropdownButton>
        </Col>
        </Row>

        <Form.Group>
          <FloatingLabel label="Credit Card No.">
            <Form.Control
              name="cardnumber"
              type="number"
              placeholder="Credit Card No."
              required
            />
            </FloatingLabel>
        </Form.Group>
        <Row>
          <Col>
        <Form.Group>
          <FloatingLabel label="CVC">
            <Form.Control
              name="cvc"
              type="text"
              placeholder="CVC"
              required
            />
            </FloatingLabel>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group>
          <FloatingLabel label="Exp. Date">
            <Form.Control
              name="exp"
              type="Date"
              placeholder="Exp."
              required
            />
            </FloatingLabel>
        </Form.Group>
        </Col>
        </Row>
        <Button variant="primary" type="submit">
            Save
          </Button>
      </Form>
      
    </div>
    </div>
  )
  }
}

export default Checkout
// class Checkout extends React.Component {

//   render() {
//     return (
//       <div>
//         <h1>hello</h1>

//       </div>
//     )
//   }
// }

// export default Checkout