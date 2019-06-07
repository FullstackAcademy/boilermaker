import React from 'react'
import CSVReader from 'react-csv-reader'

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
  }

  render() {
    return (
      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={this.handleForce}
        />
      </div>
    )
  }
}
