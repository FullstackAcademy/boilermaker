import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

class PaymentPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      FullName: '',
      CardNumber: '',
      date: '',
      CVC: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    await axios.post('/api/stripe')
  }
  render() {
    return (
      <form
        action="your-server-side-code"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <script
          src="https://checkout.stripe.com/checkout.js"
          className="stripe-button"
          data-key="pk_test_tqiGTL6uelH8qBGrgOUl0gmg"
          data-amount="999"
          data-name="Demo Site"
          data-description="Example charge"
          data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
          data-locale="auto"
        />
        {/* <span>Email</span>
        <input
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <span>Full Name</span>
        <input
          name="FullName"
          value={this.state.FullName}
          onChange={this.handleChange}
        />
        <span>Card Number</span>
        <input
          name="CardNumber"
          value={this.state.CardNumber}
          onChange={this.handleChange}
        />

        <input
          placeholder="MM/YY"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <input
          placeholder="CVC"
          name="CVC"
          value={this.state.CVC}
          onChange={this.handleChange}
        />
        <button
          className="button-default"
          type="submit"
          disabled={
            !this.state.FullName ||
            !this.state.CardNumber ||
            !this.state.date ||
            !this.state.CVC
              ? true
              : false
          }
        >
          Submit
        </button> */}
      </form>
    )
  }
}

//onSubmit will take the form information via disptached actions and throw it into the store
//the store actions will charge to stripe, as well as whatever and however we want to use
// the information

/**
Publishable
pk_test_tqiGTL6uelH8qBGrgOUl0gmg

Secret
sk_test_KyddqiZI9if0catFDDzCPiF7
*/
