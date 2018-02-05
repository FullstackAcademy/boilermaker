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
    const { children, isLoggedIn, channels, user, handleClick, navToUser, handleSearch } = this.props
    return (
      <div>
        <div className="navbar-container">
          <Navbar>
            <Navbar.Brand>
              <img src="/Bickr-logo.png" id="nav-bar-logo" />
            </Navbar.Brand>
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
                </NavLink>
                </Navbar.Text>
                {
                  isLoggedIn ?
                      <Navbar.Text>
                        <NavDropdown eventKey={2} title={user.userName} id="basic-nav-dropdown">
                          <MenuItem eventKey={2.1} onClick={this.navToUser.bind(this)}>My page</MenuItem>
                          <MenuItem eventKey={2.2} onClick={handleClick}>Logout</MenuItem>
                        </NavDropdown>
                      </Navbar.Text>
                    :
                    [
                      <Navbar.Text key="1">
                        <NavLink to="/login">
                          Login
                    </NavLink>
                      </Navbar.Text>,
                      <Navbar.Text key="2">
                        <NavLink to="/signup">
                          Sign Up
                    </NavLink>
                      </Navbar.Text>
                    ]
                }
                <Navbar.Form>
                  <FormGroup className="navbar-search">
                    <SearchBar
                      searchResults={channels.searchChannelList}
                      handleSearch={handleSearch}
                    />
                  </FormGroup>
                </Navbar.Form>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
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