import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';

const Main = props => {

  const { children, handleClick, user } = props;
  const loggedIn = !!user.id;

  return (
    <div>
      <h1>BOILERMAKER</h1>
      { loggedIn ?
          <nav>
            <Link to="/home">Home</Link>
            <a href="" onClick={handleClick}>Logout</a>
          </nav> :
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
      }
      <hr />
      { children }
    </div>
  );
};

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});

export default connect(mapState, mapDispatch)(Main);
