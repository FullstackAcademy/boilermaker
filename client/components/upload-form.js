import React from 'react'
import CSVReader from 'react-csv-reader'
import axios from 'axios'
import UploadedCompany from './uploaded-company'
import AllCompanies from './all-companies'

export default class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploaded: [],
      allCompanies: []
    }

    this.handleForce = input => {
      this.setState({
        uploaded: input
      })
      console.log('state is: ', this.state)
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

    this.handleSubmit = () => {
      this.state.uploaded.map(async company => {
        try {
          console.log('the req.body is: ', {
            companyId: parseInt(company[0]),
            companyName: company[1],
            sharePriceDate: company[2],
            sharePrice: parseFloat(company[3]),
            comments: company[4]
          })
          return await axios.put(`/api/companies/${company[0]}`, {
            companyName: company[1],
            sharePriceDate: company[2],
            sharePrice: parseFloat(company[3]),
            comments: company[4]
          })
        } catch (err) {
          console.log(err)
        }
      })
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
