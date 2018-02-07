import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import checkUserName from '../../store';

class EditUser extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: props.user.name,
      userName: props.user.userName,
      photoURL: props.user.photoURL
    };
  }

  getValidationState(key) {
    const length = this.state[key].length;
    if (length < 0) return 'error';
    if (key === 'user' && this.props.checkUserName(this.state.userName)) return 'error';
    return 'success';
  }

  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }

  handleSubmit(evt) {
    const { edit, user, hide } = this.props;
    const { name, userName, photoURL } = this.state;
    evt.preventDefault();
    const updatedUser = { id: user.id, name, userName, photoURL }
    edit(updatedUser)
    hide('displayEdit')
  }

  render() {
    // const { user } = this.props;
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="user-page-form">
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState('name')}
        >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange.bind(this, 'name')}
          />
          <FormControl.Feedback />
          {
            this.state.name.length ? null : <HelpBlock>Please enter a value</HelpBlock>
          }
        </FormGroup><br />
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState('userName')}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.userName}
            name="userName"
            onChange={this.handleChange.bind(this, 'userName')}
          />
          <FormControl.Feedback />
          {
            this.state.userName.length ? null : <HelpBlock>Please enter a value</HelpBlock>
          }
        </FormGroup><br />
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState('photoURL')}
        >
          <ControlLabel>Photo</ControlLabel>
          <FormControl
            type="text"
            value={this.state.photoURL}
            name="photoURL"
            onChange={this.handleChange.bind(this, 'photoURL')}
          />
          <FormControl.Feedback />
          {
            this.state.photoURL.length ? null : <HelpBlock>Please enter a value</HelpBlock>
          }
        </FormGroup><br />
        <div className="user-page-form-buttons">
          <Button type="submit" bsStyle="primary">Submit</Button>
          <Button onClick={() => this.props.hide('displayEdit')}>Cancel</Button>
        </div>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
      checkUserName() {
        return (dispatch(checkUserName));
    }
  }
}

export default connect(mapState, mapDispatch)(EditUser);
