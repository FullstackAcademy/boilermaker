import React, { Component } from 'react';
import { fetchUser, deleteUser } from '../../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';

import Score from './Score';
import CreateChannel from '../CreateChannel';

class UserPage extends Component {

  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.props.loadUser(Number(this.props.match.params.userId))
  }

  handleDelete(id) {
    this.props.deleteUser(id);
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <div className="user-page-header">
          <Image src={user.photoURL} rounded className="user-page-user-image" />
          <div className="user-page-header-text">
            <h1>{user.name}</h1>
            <h3>Cred</h3>
            <h4>Level: {Math.floor(user.score / 100)}</h4>
            <h5>Current Level Progress:</h5>
            <Score user={user} />
          </div>
          <div className="user-page-buttons">
            <Button bsStyle="info">Edit</Button>
            <Button bsStyle="danger" onClick={() => this.handleDelete(user.id)}>Delete</Button>
          </div>
        </div>
        <CreateChannel />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.inactiveUser
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUser(id) {
      dispatch(fetchUser(id))
    },
    deleteUser(id) {
      dispatch(deleteUser(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));