import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout } from '../reducer/user';

// Component //

const Main = props => {

  const { children, handleClick, loggedIn } = props;

  return (
    <div>
      <h1>BOILERMAKER</h1>
      { loggedIn ?
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/summer-home">Summer Home</Link>
            <a href="#" onClick={handleClick}>Logout</a>
          </nav> :
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/summer-home">Protected</Link>
          </nav>
      }
      <hr />
      { children }
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

// Container //

const mapState = ({ user }, { children }) => ({
  loggedIn: !!user.id,
  children
});

const mapDispatch = (dispatch, { history }) => ({
  handleClick () {
    dispatch(logout(history));
  }
});

export default withRouter(connect(mapState, mapDispatch)(Main));
