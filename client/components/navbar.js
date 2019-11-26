import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Image, Menu} from 'semantic-ui-react'

import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <Menu fixed="top" inverted>
    <Container>
      <Link to="/home">
        <Menu.Item as="a" header>
          <Image
            size="mini"
            src={require('../../public/images/circle-cropped.png')}
            style={{marginRight: '1.5em'}}
          />
          AllSign
        </Menu.Item>
      </Link>
      <Link to="/learn">
        <Menu.Item as="a">Learn Sign Language</Menu.Item>
      </Link>
      <Link to="/practice">
        <Menu.Item as="a">Practice Sign Language</Menu.Item>
      </Link>
      <Link to="/interactive">
        <Menu.Item as="a">Learn Interactively</Menu.Item>
      </Link>
      <Link to="/leaderboard">
        <Menu.Item as="a">High Scores</Menu.Item>
      </Link>
      <Link to="/about">
        <Menu.Item as="a">About</Menu.Item>
      </Link>
    </Container>
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.loggedInUser.id || !!state.user.user.admin,
    user: state.user.loggedInUser || state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
