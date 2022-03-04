import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CarouselSlide from './Carousel'
import {fetchPizzas} from '../store/pizzas'

import {Link} from 'react-router-dom'

export const HomePage = props => {
  const {email} = props
  return (
    <div>
      <div>
        <h3>Welcome, {email}</h3>
      </div>
      <CarouselSlide />
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(HomePage)

HomePage.propTypes = {
  email: PropTypes.string
}
