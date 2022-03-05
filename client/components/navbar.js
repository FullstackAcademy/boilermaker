import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const Navbar = ({handleClick, isLoggedIn, cartSize}) => (
  <div id="nav">
    <nav>
      {isLoggedIn ? (
        <div>
          <Link className="navLink" to="/userhome">
            <HomeIcon />
            Home
          </Link>
          <Link className="navLink" to="/pizzas">
            <LocalPizzaIcon />
            Pizzas
          </Link>
          {/* <Link className="navLink" to="/checkout">
            <PointOfSaleIcon />
            testCheckOut
          </Link> */}
          <Link className="navLink" to="/cart">
            <Badge badgeContent={cartSize} color="success" >
              <ShoppingCartIcon color="primary" />
            </Badge>
            Cart
          </Link>
          <a href="#" onClick={handleClick}>
            <LogoutIcon />
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className="navLink" to="/home">
            <HomeIcon />
            Home
          </Link>
          <Link className="navLink" to="/pizzas">
            <LocalPizzaIcon />
            Pizzas
          </Link>
          <Link className="navLink" to="/login">
            <LoginIcon />
            Login
          </Link>
          <Link className="navLink" to="/signup">
            <AirplaneTicketIcon />
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartSize: state.cart.length
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
