import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user}) => (
 
  <div>
    <h1>ALL SIGN</h1>
    <nav>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/learn">Learn Sign Language</Link>
        <Link to="/practice">Practice Sign Language</Link>
        <Link to="/interactive">Learn Interactively</Link>
        <Link to="/leaderboard">High Scores</Link>
        <Link to="/about">About</Link>
        
        {isLoggedIn ? (
          <span>
            {/* The navbar will show these links after you log in */}
            <Link to={`/profile/${user.id}`}>Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </span>
        ) : (
          <span>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </span>
        )}
      </div>
    </nav>
    <hr />
  </div>
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
