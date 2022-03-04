import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="nav">
    <nav>
      {isLoggedIn ? (
        <div>
          <Link className="navLink" to="/userhome">
            Home
          </Link>
          <Link className="navLink" to="/pizzas">
            Pizzas
          </Link>
          <Link className="navLink" to="/cart">
            Cart
          </Link>
         
          <Link className="navLink" to="/checkout">
            testCheckOut
          </Link>

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="navLink" to="/home">
            Home
          </Link>
          <Link className="navLink" to="/pizzas">
            Pizzas
          </Link>
          <Link className="navLink" to="/login">
            Login
          </Link>
          <Link className="navLink" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
