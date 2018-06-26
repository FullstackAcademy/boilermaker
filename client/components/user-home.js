import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { HoopMap } from './'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  return (
    <div>
      <h3>Welcome, {email.slice(0, email.indexOf('@'))}</h3>
      <HoopMap />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
