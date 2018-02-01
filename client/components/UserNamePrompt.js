import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createUserName } from '../store'

const UserNamePrompt = (props) => {
  const { user, userId, updateUserName } = props;
  return (
    <div>
      <h3>{user.name}, don't have a username</h3>
      <form onSubmit={updateUserName}>
        <label>Username</label>
        <input type="text" name="userName" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.me
  }
}
const mapDispatch = (dispatch, ownProps) => {
  const userId = ownProps.match.params.userId;
  return {
    updateUserName(evt) {
      evt.preventDefault();
      const updatedUser = {
        userId,
        userName: evt.target.userName.value
      }
      dispatch(createUserName(updatedUser));
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserNamePrompt));
