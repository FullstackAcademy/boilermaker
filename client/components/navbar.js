import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Nav, Navbar as BootstrapNavbar} from 'react-bootstrap'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <BootstrapNavbar bg="dark" variant="light" id="flex">
      <div>
        <Link to="/home">
          <img
            style={{width: '3rem', height: '3rem'}}
            src="Stream-Logo.png"
            alt="Steam"
          />
        </Link>
        <BootstrapNavbar.Brand style={{fontWeight: 'bold'}}>
          <Link
            to="/home"
            className="text-white font-italic text-decoration-none"
          >
            {' '}
            STREAM
          </Link>
        </BootstrapNavbar.Brand>
      </div>
      <Nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Nav>
              <Nav.Item className="d-flex align-items-center">
                Hi, {user.spotifyId}
              </Nav.Item>
              <Nav.Item>
                <Link to="/" onClick={handleClick} className="nav-name">
                  Logout
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <a href="/auth/spotify" className="nav-name">
              Log in with Spotify
            </a>
          </div>
        )}
      </Nav>
    </BootstrapNavbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
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
