import React, { Component } from 'react';
import { socket } from '../../socket';
import { Button } from 'react-bootstrap';

class ReactionButtons extends Component {

  sendReaction(evt, reactionId) {
    evt.preventDefault();
    socket.emit('reaction', reactionId);
  }

  render() {
    return (
      <div>
        <Button bsStyle="success" onClick={(evt) => this.sendReaction(evt, 1)}> BIG FACTS </Button>
        <Button bsStyle="info" onClick={(evt) => this.sendReaction(evt, 2)}> #FAKENEWS </Button>
        <Button bsStyle="danger" onClick={(evt) => this.sendReaction(evt, 3)}> [citation needed] </Button>
      </div>
    )
  }
}

export default ReactionButtons;
