import React from 'react'
import CSVReader from 'react-csv-reader'

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
    this.handleForce = input => {
      console.log('before: ', this.state)
      console.log(input)
      this.setState({data: input})
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
