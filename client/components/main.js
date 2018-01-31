import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { logout, fetchSingleUser, fetchFilteredUsers } from '../store';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SearchBar from './SearchBar'

const Main = (props) => {
  const { children, handleClick, isLoggedIn, channels, users, getMessages, getFilteredUsers, history, handleSubmit } = props

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
              <Navbar.Form>
                <SearchBar channels={channels} users={users} getFilteredUsers={getFilteredUsers} history={history} handleSubmit={handleSubmit} />
              </Navbar.Form>
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
const mapState = (state, ownProps) => {
  return {
    isLoggedIn: !!state.me.id,
    channels: state.channels,
    users: state.users,
    history: ownProps.history
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const history = ownProps.history;
  return {
    handleClick() {
      dispatch(logout())
    },
    getFilteredUsers(searchTerm) {
      dispatch(fetchFilteredUsers(searchTerm))
    }, 
    handleSubmit(evt, filteredUsers, filteredChannels) {
      evt.preventDefault();
      const userId = filteredUsers.find(user => user.userName === evt.target.search.value).id
      console.log(userId);
      dispatch(fetchSingleUser(userId));
      history.push(`/users/${userId}`)
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))