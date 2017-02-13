import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';

const Main = props => {

  const { children, handleClick, user } = props;

  return (
    <div>
      <h1>BOILERMAKER</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
      {
        user.email ?
          <div>
            <br />
            <Link to="/home">Home</Link>
            <br />
            <a href="" onClick={handleClick}>Logout</a>
          </div> : null
      }
      <hr />
      { children }
    </div>
  );
};

const mapState = ({ user }) => ({ user });
const mapDispatch = dispatch => {
  return {
    handleClick () {
      dispatch(logout());
    }
  };
};
export default connect(mapState, mapDispatch)(Main);
