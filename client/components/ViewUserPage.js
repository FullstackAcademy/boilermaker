import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CarouselSlide from './Carousel'
import {fetchPizzas} from '../store/pizzas'

import {Link} from 'react-router-dom'

export const UserHome = props => {
  const {email} = props
  return (
    <div>
      <div>
        <h3>Welcome, {email}</h3>
      </div>
      <button type="button">Check Your History</button>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
