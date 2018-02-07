import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createChannel, editUser } from '../store';


class CreateChannel extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      channelValue: '',
      descriptionValue: ''
    };
  }

  getValidationState(key) {
    const length = this.state[key].length;
    if (length > 2 && length < 26) return 'success';
    else if (length < 3 || length > 25) return 'error';
    return null;
  }

  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let et = evt.target;
    let { user, updateUser } = this.props;
    this.props.makeChannel(et.channel.value, et.category.value, et.description.value, et.type.value, user.id, user);
    this.setState({ channelValue: '', descriptionValue: '' })
    //update me
  }

  render() {
    const categories = this.props.categories;

    return (
      <form onSubmit={this.handleSubmit} className="user-page-form">
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState('channelValue')}
        >
          <ControlLabel>Create a Channel</ControlLabel>
          <FormControl
            type="text"
            value={this.state.channelValue}
            name="channel"
            placeholder="Enter channel name"
            onChange={this.handleChange.bind(this, 'channelValue')}
          />
          <FormControl.Feedback />
          {
            this.state.channelValue.length ? null : <HelpBlock>Please enter a value</HelpBlock>
          }
        </FormGroup><br />
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Category</ControlLabel>
          <FormControl componentClass="select" placeholder="select" name="category">
            {
              categories.map(category => {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                )
              })
            }
          </FormControl>
        </FormGroup><br />
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Type</ControlLabel>
          <FormControl componentClass="select" placeholder="select" name="type">
              <option key={1} value="Debate">Debate</option>
              <option key={2} value="Rap Battle">Rap Battle</option>
          </FormControl>
        </FormGroup><br />
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState('descriptionValue')}
        >
          <ControlLabel>Describe Your Channel</ControlLabel>
          <FormControl
            type="text"
            value={this.state.descriptionValue}
            name="description"
            placeholder="Enter description"
            onChange={this.handleChange.bind(this, 'descriptionValue')}
          />
          <FormControl.Feedback />
          {
            this.state.descriptionValue.length ? null : <HelpBlock>Please enter a value</HelpBlock>
          }
        </FormGroup><br />
        <div className="user-page-form-buttons">
          <Button type="submit" bsStyle="success">Submit</Button>
          <Button onClick={() => this.props.hide('displayCreate')}>Cancel</Button>
        </div>
      </form>
    );
  }
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    makeChannel(channel, categoryId, description, type, userId, user) {
      dispatch(createChannel(
        channel,
        categoryId,
        description,
        type,
        userId,
        user
      ))
    },
    updateUser(user) {
      dispatch(editUser(user))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CreateChannel));