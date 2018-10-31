import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="header-nav">
    <h1>Iron Flown Grocery</h1>
    <AppBar position="static">
      <ToolBar className="navbar">
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button component={Link} to="/login">
                Login
              </Button>
              <Button component={Link} to="/signup">
                Signup
              </Button>
              <Button component={Link} to="/addproduct">
                Add Product
              </Button>
              <Button>Cart</Button>
            </div>
          )}
        </nav>
        <hr />
      </ToolBar>
    </AppBar>
  </div>
)

/**
 * CONTAINER
 */
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

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
