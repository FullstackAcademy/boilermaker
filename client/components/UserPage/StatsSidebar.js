import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';


export default class StatsSidebar extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { user } = this.props;
    return (
      <div className="user-page-stats-sidebar">
        <h3>Channels: {user.channels && user.channels.length}</h3>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            {
              user.channels && user.channels.map(channel => {
                return (
                  <option key={channel.name} value={channel.name}>{channel.name}</option>
                )
              })
            }
          </FormControl>
        </FormGroup>
        <h3>Wins: {user.wins}</h3>
        <h3>Losses: {user.losses}</h3>
      </div>
    )
  }
}