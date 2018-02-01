import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import axios from 'axios';
import { logout, fetchSingleUser, fetchSearchChannels } from '../store';
import { Navbar, Nav, NavItem, FormGroup } from 'react-bootstrap';
import SearchBar from './SearchBar'

class Main extends Component {

  render() {
    const { children, isLoggedIn, channels, handleClick, handleSearch } = this.props
    return (
      <div>
        <Navbar>
          <Navbar.Brand>
            <img src="/Bickr-logo.png" id="nav-bar-logo" />
          </Navbar.Brand>
          {
            isLoggedIn ?
              <Navbar.Collapse>
                <Navbar.Text>
                  <NavLink to="/">
                    Home
                </NavLink >
                </Navbar.Text>
                <Navbar.Text>
                  <NavLink onClick={handleClick} to="/">
                    Logout
                </NavLink >
                </Navbar.Text>
              </Navbar.Collapse>
              :
              <Navbar.Collapse>
                <Navbar.Text>
                  <NavLink to="/">
                    Home
                </NavLink >
                </Navbar.Text>
                <Navbar.Text>
                  <NavLink to="/login">
                    Login
                </NavLink >
                </Navbar.Text>
                <Navbar.Text>
                  <NavLink to="/signup">
                    Sign Up
                </NavLink >
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
        <hr />
        {children}
      </div >
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    isLoggedIn: !!state.me.id,
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