import React, { Component } from 'react';
import { fetchSingleUser, deleteUser, editUser } from '../../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';

import Score from './Score';
import CreateChannel from '../CreateChannel';
import DeleteWarning from './DeleteWarning';
import EditUser from './EditUser';

class UserPage extends Component {

  constructor() {
    super();
    this.state = {
      displayWarning: false,
      displayEdit: false,
      displayCreate: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.display = this.display.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    this.props.loadUser(Number(this.props.match.params.userId))
  }

  display(key) {
    this.setState({ [key]: true })
  }

  hide(key) {
    this.setState({ [key]: false })
  }

  handleEdit(user) {
    this.props.editUser(user)
  }

  handleDelete(id) {
    this.props.deleteUser(id)
  }

  render() {
    const { user } = this.props;
    const userId = Number(this.props.match.params.userId);
    const myId = this.props.me.id;

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
          {
            myId === userId
              ?
              <div className="user-page-buttons">
                <div className="user-page-user-buttons">
                  <Button bsStyle="info" onClick={() => this.display('displayEdit')}>Edit</Button>
                  <Button bsStyle="danger" onClick={() => this.display('displayWarning')}>Delete</Button>
                </div>
                <div>
                  <Button bsStyle="success" onClick={() => this.display('displayCreate')}>Create a channel</Button>
                </div>
              </div>
              :
              null
          }
        </div>
        {
          this.state.displayWarning
            ?
            <DeleteWarning
              deleteUser={this.handleDelete}
              hide={this.hide}
              id={user.id}
            />
            :
            null
        }
        {
          this.state.displayEdit
            ?
            <EditUser
              edit={this.handleEdit}
              user={user}
              hide={this.hide}
            />
            :
            null
        }
        {
          this.state.displayCreate
            ?
            <CreateChannel hide={this.hide} />
            :
            null
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.users.singleUser,
    me: state.me
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUser(id) {
      dispatch(fetchSingleUser(id))
    },
    deleteUser(id) {
      dispatch(deleteUser(id))
    },
    editUser(id) {
      dispatch(editUser(id))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));