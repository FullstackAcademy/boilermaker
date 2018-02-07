import React from 'react';
import { Button } from 'react-bootstrap';

const Voting = (props) => {
  const { vote, elementId } = props;
  return (
    <div id={"vote-button-container-" + elementId} className="animated slideInUp vote-button">
      <Button
        id={'vote-'+elementId}
        bsStyle="success"
        bsSize="large"
        onClick={vote}
      >
        Vote
      </Button>
    </div>
  )
}

export default Voting;

