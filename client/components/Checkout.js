import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'



class Checkout extends React.Component {

  render() {
  return (
    <div className="shippingaddress">
      <Form>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Enter email"
              required
            />
        </Form.Group>
         <Form.Group>
          <Form.Label>
            Street Address
          </Form.Label>
          <Form.Control 
          name="streetaddress"
          type="text"
          placeholder="Enter you Address"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
           Postal/Zip Code
          </Form.Label>
          <Form.Control 
          name="postal/zip/code"
          type="text"
          placeholder="Postal/Zip Code*"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            City
          </Form.Label>
          <Form.Control 
          name="city"
          type="text"
          placeholder="City*"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
           State
          </Form.Label>
          <Form.Control 
          name="State"
          type="text"
          placeholder="Province/State"
          />
        </Form.Group>
       

      </Form>
      
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