import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import history from '../../history';


export default class StatsSidebar extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    history.push(`/channels/${evt.target.channel.value}`);
  }

  render() {
    const { user } = this.props;

    let channelTotal = user.channels && user.channels.length > 1 ? 'Channels' : 'Channel'
    return (
      <div className="user-page-stats-sidebar">
        <div>
          {
            user.channels && user.channels.length > 0 ?
              <form onSubmit={this.handleSubmit} className="user-page-stats-sidebar-form">
                <FormGroup controlId="formControlsSelect" className="animated rotateInDownLeft">
                  <ControlLabel>{user.userName}'s {user.channels && user.channels.length} {channelTotal}</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" name="channel">
                    {
                      user.channels && user.channels.map(channel => {
                        return (
                          <option key={channel.name} value={channel.name}>{channel.name}</option>
                        )
                      })
                    }
                  </FormControl>
                </FormGroup>
                <Button type="submit" className="user-page-stats-sidebar-submit animated rotateInUpLeft">Go to channel</Button>
              </form>
              : null
          }
        </div>
        <div className="user-page-stats-sidebar-record">
          <h3 className="animated rotateInDownRight">Wins: {user.wins}</h3>
          <h3 className="animated rotateInUpRight">Losses: {user.losses}</h3>
        </div>
      </div>
    )
  }
}