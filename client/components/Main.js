import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';

const Main = props => {

  const { children, handleClick, user } = props;

  return (
    <div>
      <h1>BOILERMAKER</h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        { user.id && <Link to="/home">Home</Link> }
        { user.id && <a href="" onClick={handleClick}>Logout</a> }
      </nav>
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
