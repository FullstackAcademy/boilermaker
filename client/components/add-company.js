import React from 'react'
import axios from 'axios'

export default class AddCompany extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyId: 0,
      companyName: '',
      sharePriceDate: '',
      sharePrice: 0,
      comments: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(changeEvent) {
    this.setState({
      [changeEvent.target.name]: changeEvent.target.value
    })
    console.log(this.state)
  }

  handleSubmit = async submitEvent => {
    try {
      submitEvent.preventDefault()
      await axios.post(`/api/companies/`, this.state)
      this.setState({
        companyId: 0,
        companyName: '',
        sharePriceDate: '',
        sharePrice: 0,
        comments: ''
      })
    } catch (err) {
      console.log('oh no!!', err)
    }
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <h4>Enter your company information below!</h4>
        <form onSubmit={this.handleSubmit}>
          <label>Company ID:</label>
          <input
            type="text"
            name="companyId"
            value={this.state.companyId}
            onChange={this.handleChange}
          />
          <br />
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={this.state.companyName}
            onChange={this.handleChange}
          />
          <br />
          <label>Share Price Date:</label>
          <input
            type="text"
            name="sharePriceDate"
            value={this.state.sharePriceDate}
            onChange={this.handleChange}
          />
          <br />
          <label>Share Price:</label>
          <input
            type="text"
            name="sharePrice"
            value={this.state.sharePrice}
            onChange={this.handleChange}
          />
          <br />
          <label>Comments:</label>
          <input
            type="text"
            name="comments"
            value={this.state.comments}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
