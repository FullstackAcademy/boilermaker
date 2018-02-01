import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import axios from 'axios';
import { logout, fetchSingleUser, searchChannels } from '../store';
import { Navbar, Nav, NavItem, FormGroup } from 'react-bootstrap';
import SearchBar from './SearchBar'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      options: []
    }
    this.loadChannels = this.loadChannels.bind(this);
  }
  componentDidMount() {
    this.loadChannels();
  }

  loadChannels() {
    return axios.get('/api/channels')
      .then(res => this.setState({ options: res.data }))
  }
  render() {
    const { children, handleClick, isLoggedIn, channels } = this.props
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
                    <SearchBar options={this.state.options} />
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
    channels: state.channels,
    history: ownProps.history
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const history = ownProps.history;
  return {
    handleClick() {
      dispatch(logout())
    },
    handleSubmit(evt, filteredUsers, filteredChannels) {
      evt.preventDefault();
      const userId = filteredUsers.find(user => user.userName === evt.target.search.value).id
      dispatch(fetchSingleUser(userId));
      history.push(`/users/${userId}`)
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Main))