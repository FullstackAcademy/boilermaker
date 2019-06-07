import React from 'react'

const UploadedCompany = props => {
  return (
    <div>
      <h3>
        You just uploaded this company: {props.companyName}, with share prices
        at: ${props.sharePrice}
      </h3>
    </div>
  )
}

export default UploadedCompany
