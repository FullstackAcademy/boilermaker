import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {  Row, Col, FloatingLabel, InputGroup } from "react-bootstrap";


///notes => handleSUbmit for both different forms 
// handleorder to the actual checkout

class Checkout extends React.Component {
  render() {
    return (
      <Card id="checkoutcard">
        <div id='totalform'>
          <div className="shippingaddress">
            <Form >
              <Form.Label column="lg" lg={5}>Shipping Address</Form.Label>
              <Form.Group>
                <FloatingLabel label="Email address" className="label" id="topinput"> 
                <Form.Control
                name="email"
                type="text"
                placeholder="Enter email"
                required
                />
                </FloatingLabel>
              </Form.Group>
              <Form.Group>
                <FloatingLabel label="Street Address" className="label">
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
                    <FloatingLabel label="Postal/Zip Code" className="label">
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
                      <FloatingLabel label="City" className="label">
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
          <FloatingLabel label="State" className="label">
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
     
      <div id="cardinfo">
      <Form title="Payment Informtion" >
         <Form.Label column="lg" lg={5}>Payment Information</Form.Label>
        <Row>
          <Col>
        <Form.Group >
          <FloatingLabel label="Name on Card" className="label" id="bottominput">
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
        <Form.Select variant="outline-secondary" size="lg" required className="label">
          <option value='1'>Visa</option>
          <option value='2'>MasterCard</option>
          <option value='3'>Amex</option>
          <option value='4'>Discover</option>
        </Form.Select>
      
        {/* <DropdownButton id="dropdown-basic-button" title="Card" variant="outline-secondary">
          <Dropdown.Item>Visa</Dropdown.Item>
          <Dropdown.Item>MasterCard</Dropdown.Item>
          <Dropdown.Item>Amex</Dropdown.Item>
        </DropdownButton> */}
    
        </Col>
        </Row>

        <Form.Group>
          <FloatingLabel label="Credit Card No." className="label">
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
          <FloatingLabel label="CVC" className="label">
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
          <FloatingLabel label="Exp. Date" className="label">
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

    <Button variant="primary" type="Submit" size='lg'>Confirm Order</Button>
     </Card>
     
    
  )
  }
}

export default Checkout
