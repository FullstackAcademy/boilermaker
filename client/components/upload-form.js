import React from 'react'
import CSVReader from 'react-csv-reader'
import axios from 'axios'

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
          await axios.put(`/api/companies/${company[0]}`, {
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

        {this.state.uploaded.length !== 0 ? (
          <div>
            <h4>Companies Just Uploaded: </h4>
            <ul>
              {this.state.uploaded.map(company => (
                <li key={Math.random()}>
                  name: {company[1]}, at share price: ${parseFloat(company[3])},
                  on: {company[2]} with comments: {company[4]} with company Id:
                  {company[0]}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h4>upload a CSV!</h4>
        )}

        <div>
          <h4>Companies in Database: </h4>
          <ul>
            {this.state.allCompanies.map(company => (
              <li key={Math.random()}>
                name: {company.companyName}, at share price: ${
                  company.sharePrice
                }{' '}
                on: {company.sharePriceDate} with comments: {company.comments}{' '}
                with company Id: {company.companyId}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
