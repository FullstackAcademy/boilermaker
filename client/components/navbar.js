import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Image, Menu} from 'semantic-ui-react'

import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as="a" header>
        <Image
          size="mini"
          src={require('../../public/images/circle-cropped.png')}
          style={{marginRight: '1.5em'}}
        />
        <Link to="/home">AllSign</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/learn">Learn Sign Language</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/practice">Practice Sign Language</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/interactive">Learn Interactively</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/leaderboard">High Scores</Link>
      </Menu.Item>
      <Menu.Item as="a">
        <Link to="/about">About</Link>
      </Menu.Item>
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
