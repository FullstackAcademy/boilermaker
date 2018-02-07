import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import store, { addPrompt } from '../../store';

export default class CreatePrompt extends Component {

  constructor() {
    super();
    this.state = {
      promptValue: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getValidationState(key) {
    const length = this.state[key].length;
    if (length > 6 && length < 40) return 'success';
    else if (length < 7 || length > 40) return 'error';
    return null;
  }

  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    store.dispatch(addPrompt(evt.target.prompt.value));
    this.setState({ promptValue: '' });
    this.props.display('toggleCreatePrompt');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="create-prompt-form prompt-box">
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState('promptValue')}
        >
          <ControlLabel>Create a Prompt</ControlLabel>
          <FormControl
            type="text"
            value={this.state.promptValue}
            name="prompt"
            placeholder="Enter prompt"
            onChange={this.handleChange.bind(this, 'promptValue')}
          />
          <FormControl.Feedback />
          {
            this.state.promptValue.length < 7 ? <HelpBlock>Prompts must be longer than six characters</HelpBlock> : null
          }
        </FormGroup><br />
        <div className="create-prompt-form-buttons">
          <Button type="submit" bsStyle="success">Submit</Button>
          <Button onClick={() => this.props.display('toggleCreatePrompt')}>Cancel</Button>
        </div>
      </form>
    )
  }
}