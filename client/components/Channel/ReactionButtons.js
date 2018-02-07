import React, { Component } from 'react';
import { socket } from '../../socket';
import { Button } from 'react-bootstrap';

class ReactionButtons extends Component {

  sendReaction(evt, reactionId) {
    evt.preventDefault();
    socket.emit('reaction', reactionId);
    setTimeout(() => {
      socket.emit('reaction', 0);
    }, 5000);
  }

  render() {
    return (
      <div id="reaction-buttons" className="animated flipInY">
        <Button bsStyle="success" onClick={(evt) => this.sendReaction(evt, 1)}> BIG FACTS </Button>
        <Button bsStyle="info" onClick={(evt) => this.sendReaction(evt, 2)}> [citation needed] </Button>
        <Button bsStyle="danger" onClick={(evt) => this.sendReaction(evt, 3)}> #FAKENEWS </Button>
      </div>
    )
  }
}

export default ReactionButtons;
