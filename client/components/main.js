import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import axios from 'axios';
import { logout, fetchSingleUser, fetchSearchChannels } from '../store';
import { Navbar, Nav, NavItem, FormGroup, NavDropdown, MenuItem } from 'react-bootstrap';
import SearchBar from './SearchBar';
import history from '../history';
import { linkUserProfile } from '../socket';

class Main extends Component {

  navToUser() {
    history.push(`/users/${this.props.user.id}`)
  }

  render() {
    const { children, isLoggedIn, channels, handleClick, handleSearch, user } = this.props
    return (
      <div>
        {
          isLoggedIn && linkUserProfile(user.id, user.userName)
        }
        <Navbar>
          <Navbar.Brand>
            <img src="/Bickr-logo.png" id="nav-bar-logo" />
          </Navbar.Brand>
          {
            isLoggedIn ?
              <Navbar.Collapse>
                <Nav>
                  <Navbar.Text eventKey={1}>
                    <NavLink to="/">
                      Home
                  </NavLink>
                  </Navbar.Text>
                  <Navbar.Text>
                    <NavLink to="/categories">
                      Categories
                </NavLink >
                  </Navbar.Text>
                  <Navbar.Text>
                    <NavLink onClick={handleClick} to="/">
                      Logout
                </NavLink >
                  </Navbar.Text>
                  <Navbar.Text>
                    <NavDropdown eventKey={2} title={user.userName} id="basic-nav-dropdown">
                      <MenuItem eventKey={2.1} onClick={this.navToUser.bind(this)}>My page</MenuItem>
                      <MenuItem eventKey={2.2} onClick={handleClick}>Logout</MenuItem>
                    </NavDropdown>
                  </Navbar.Text>
                </Nav>
              </Navbar.Collapse>
              :
              <Navbar.Collapse>
                <Navbar.Text>
                  <NavLink to="/">
                    Home
                </NavLink>
                </Navbar.Text>
                <Navbar.Text>
                  <NavLink to="/categories">
                    Categories
                </NavLink >
                </Navbar.Text>
                <Navbar.Text>
                  <NavLink to="/login">
                    Login
                </NavLink>
                </Navbar.Text>
                <Navbar.Text>
                  <NavLink to="/signup">
                    Sign Up
                </NavLink>
                </Navbar.Text>
                <Navbar.Form>
                  <FormGroup>
                    <SearchBar
                      searchResults={channels.channelList}
                      handleSearch={handleSearch}
                    />
                  </FormGroup>
                </Navbar.Form>
              </Navbar.Collapse>
          }
        </Navbar>
        {children}
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    isLoggedIn: !!state.me.id,
    user: state.me,
    channels: state.channels
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const history = ownProps.history;
  return {
    handleClick() {
      dispatch(logout())
    },
    handleSearch(query) {
      dispatch(fetchSearchChannels(query))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))