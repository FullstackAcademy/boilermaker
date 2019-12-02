import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Image, Menu} from 'semantic-ui-react'

import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <Menu fixed="top" inverted>
    <Container id="navbar">
      <Link id="leftnavbar" to="/home">
        <Menu.Item as="a" header id="leftnavbar">
          <Image
            size="mini"
            src={require('../../public/images/circle-cropped.png')}
            style={{marginRight: '1.5em'}}
          />
          AllSign
        </Menu.Item>
      </Link>
      <Link id="leftnavbar" to="/learn">
        <Menu.Item id="leftnavbar" as="a">
          Learn Sign Language
        </Menu.Item>
      </Link>
      <Link id="leftnavbar" to="/practice">
        <Menu.Item id="leftnavbar" as="a">
          Practice Sign Language
        </Menu.Item>
      </Link>
      <Link id="leftnavbar" to="/interactive">
        <Menu.Item id="leftnavbar" as="a">
          Learn Interactively
        </Menu.Item>
      </Link>
      <Link id="leftnavbar" to="/leaderboard">
        <Menu.Item id="leftnavbar" as="a">
          High Scores
        </Menu.Item>
      </Link>
      <Link id="leftnavbar" to="/about">
        <Menu.Item id="leftnavbar" as="a">
          About
        </Menu.Item>
      </Link>
    </Container>

    {isLoggedIn ? (
      <Container id="rightnavbar">
        <Link id="rightnav" href="#" onClick={handleClick}>
          <Menu.Item id="rightnav" as="a">
            Logout
          </Menu.Item>
        </Link>
      </Container>
    ) : (
      <Container id="rightnavbar">
        <Link id="rightnav" to="/login">
          <Menu.Item id="rightnav" as="a">
            Login
          </Menu.Item>
        </Link>
        <Link id="rightnav" to="/signup">
          <Menu.Item id="rightnav" as="a">
            Sign Up
          </Menu.Item>
        </Link>
      </Container>
    )}
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
