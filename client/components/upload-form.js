import React from 'react'
import CSVReader from 'react-csv-reader'
import axios from 'axios'

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyId: 0,
      companyName: '',
      sharePriceDate: '',
      sharePrice: 0,
      comments: ''
    }
    this.handleForce = input => {
      console.log('before: ', this.state)
      console.log(input)
      this.setState({
        companyId: parseInt(input[1][0]),
        companyName: input[1][1],
        sharePriceDate: input[1][2],
        sharePrice: parseFloat(input[1][3]),
        comments: input[1][4]
      })
      console.log('after: ', this.state)
    }

    this.handleSubmit = async () => {
      console.log('clicked submit')
      try {
        await axios.put(`/api/companies/${this.state.companyId}`, {
          companyId: this.state.companyId,
          companyName: this.state.companyName,
          sharePriceDate: this.state.sharePriceDate,
          sharePrice: this.state.sharePrice,
          comments: this.state.comments
        })
      } catch (err) {
        console.log('oh no!!', err)
      }
    }
  }

  render() {
    return (
      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={this.handleForce}
        />
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    )
  }
}
