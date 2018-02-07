import React, { Component } from 'react';
import { Navbar, Nav, NavItem, FormGroup, NavDropdown, MenuItem } from 'react-bootstrap';
import { withRouter, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import history from '../history';
import { logout, fetchSingleUser, fetchSearchChannels, fetchCategories } from '../store';
import { connect } from 'react-redux';


class NavBar extends Component {

  constructor() {
    super();
    this.navToUser = this.navToUser.bind(this);
    this.navToCat = this.navToCat.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  navToUser() {
    history.push(`/users/${this.props.user.id}`);
  }

  navToCat(url) {
    history.push(url)
  }

  render() {
    const { isLoggedIn, channels, user, handleClick, handleSearch, categories } = this.props;
    return (
      <div className="navbar-container">
        <Navbar>
          <Navbar.Brand>
            <img src="/Bickr-logo.png" id="nav-bar-logo" />
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav activeKey="1">
              <Navbar.Text eventKey="1">
                <NavLink to="/">
                  Home
              </NavLink>
              </Navbar.Text>
              <Navbar.Text>
                <NavDropdown eventKey="3" title="Categories" id="basic-nav-dropdown">
                  <MenuItem eventKey="3.0" onClick={() => this.navToCat('/categories')}>All</MenuItem>
                  {
                    categories.map(category => {
                      return (
                        <MenuItem key={category.name} eventKey={(3 + category.id).toString()} onClick={() => this.navToCat(`/categories/${category.name}/channels`)}>{category.name}</MenuItem>
                      )
                    })
                  }
                </NavDropdown>
              </Navbar.Text>
              {
                isLoggedIn ?
                  <Navbar.Text>
                    <NavDropdown eventKey="2" title={user.userName} id="basic-nav-dropdown">
                      <MenuItem eventKey="2.1" onClick={this.navToUser}>My page</MenuItem>
                      <MenuItem eventKey="2.2" onClick={handleClick}>Logout</MenuItem>
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
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    isLoggedIn: !!state.me.id,
    user: state.me,
    channels: state.channels,
    categories: state.categories
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    handleSearch(query) {
      dispatch(fetchSearchChannels(query))
    },
    loadCategories() {
      dispatch(fetchCategories())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NavBar))