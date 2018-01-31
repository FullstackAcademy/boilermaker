import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import { fetchSingleUser } from '../../store';

import Score from './Score';

class UserPage extends Component {
  componentDidMount() {
    this.props.loadSingleUser(Number(this.props.match.params.userId))
  }

  render() {
    const { user } = this.props;

    return (
      <div className="user-page-header">
        <Image src={user.photoURL} rounded className="user-page-user-image" />
        <div className="user-page-header-text">
          <h1>{user.name}</h1>
          <h3>Cred</h3>
          <h4>Level: {Math.floor(user.score / 100)}</h4>
          <h5>Current Level Progress:</h5>
          <Score user={user} />
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  
  return {
    user: state.users.singleUser
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadSingleUser(id) {
      dispatch(fetchSingleUser(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));