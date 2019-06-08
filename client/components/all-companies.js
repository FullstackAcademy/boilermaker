import React from 'react'

const AllCompanies = props => {
  return (
    <div>
      <h4>Companies: </h4>
      <ul>
        {props.company.map(company => (
          <li key={Math.random()}>
            name: {company.companyName}, at share price: ${company.sharePrice}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllCompanies
