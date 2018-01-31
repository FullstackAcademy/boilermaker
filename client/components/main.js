import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { logout, setMessages } from '../store';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, getMessages } = props

  return (
    <div>
      <Navbar>
        <Navbar.Brand>
          <img src="/Bickr-logo.png" id="nav-bar-logo" />
        </Navbar.Brand>
        {
          isLoggedIn ?
            <Navbar.Collapse>
              <h3>
                <Navbar.Text>
                  <NavLink to="/">
                    Home
                </NavLink >
                </Navbar.Text>
              </h3>
              <h3>
                <Navbar.Text>
                  <NavLink onClick={handleClick} to="/">
                    Logout
                </NavLink >
                </Navbar.Text>
              </h3>
            </Navbar.Collapse>
            :
            <Navbar.Collapse>
              <h3>
                <Navbar.Text>
                  <NavLink to="/">
                    Home
              </NavLink >
                </Navbar.Text>
              </h3>
              <h3>
                <Navbar.Text>
                  <NavLink to="/login">
                    Login
                </NavLink >
                </Navbar.Text>
              </h3>
              <h3>
                <Navbar.Text>
                  < NavLink to="/signup">
                    Sign Up
              </NavLink >
                </Navbar.Text>
              </h3>
            </Navbar.Collapse>
        }
      </Navbar>
      <hr />
      {children}
    </div >
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.me.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getMessages() {
      dispatch(setMessages())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))