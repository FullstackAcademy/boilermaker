import React from 'react'
import CSVReader from 'react-csv-reader'
import axios from 'axios'
import UploadedCompany from './uploaded-company'
import AllCompanies from './all-companies'

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      companyId: 0,
      companyName: '',
      sharePriceDate: '',
      sharePrice: 0,
      comments: '',
      allCompanies: []
    }

    this.handleForce = input => {
      this.setState({
        companyId: parseInt(input[1][0]),
        companyName: input[1][1],
        sharePriceDate: input[1][2],
        sharePrice: parseFloat(input[1][3]),
        comments: input[1][4]
      })
    }

    this.componentDidMount = async () => {
      try {
        const allCompanies = await axios.get('/api/companies/')
        const allCompaniesData = allCompanies.data
        const allCompaniesDataFiltered = allCompaniesData.filter(
          company => company.companyName
        )
        this.setState({allCompanies: allCompaniesDataFiltered})
      } catch (err) {
        console.log('error', err)
      }
    }

    this.handleSubmit = async () => {
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
          label="Select CSV to upload with company data"
          onFileLoaded={this.handleForce}
        />
        <button onClick={this.handleSubmit}>submit</button>
        {/* {this.state.companyName !== '' ? (
          <UploadedCompany
            companyName={this.state.companyName}
            sharePrice={this.state.sharePrice}
          />
        ) : (
          <h4>'upload a CSV!</h4>
        )} */}
        <div>
          <AllCompanies company={this.state.allCompanies} />
        </div>
      </div>
    )
  }
}
