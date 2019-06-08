import React from 'react'

const UploadedCompany = props => {
  return (
    <div>
      <h4>
        You just uploaded this company: {props.companyName}, with share prices
        at: ${props.sharePrice}, click submit to submit this company info!
      </h4>
    </div>
  )
}

export default UploadedCompany
