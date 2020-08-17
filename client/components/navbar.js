import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink id="shirt-logo" to="/">
                <h3>lets trend..</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile">
                <h5>Profile</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" onClick={handleClick}>
                <h5>Logout</h5>
              </NavLink>
            </li>
            {isAdmin ? (
              <li className="nav-item">
                <NavLink to="/allUsers">
                  <h3>All Users</h3>
                </NavLink>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      ) : (
        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink id="shirt-logo" to="/">
                <h3>lets trend...</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">
                <h3>Login</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signup">
                <h3>Sign Up</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
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
