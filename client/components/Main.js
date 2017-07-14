import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// COMPONENT //

const Main = (props) => {

  const {children, handleClick, isLoggedIn} = props;

  return (
    <div>
      <h1>BOILERMAKER</h1>
      <nav>
        {
          isLoggedIn ?
            <div>
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div> :
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

// CONTAINER //
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Main)

// TYPES //

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
