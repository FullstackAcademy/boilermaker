import React from 'react';
import { Button } from 'react-bootstrap';

const Voting = (props) => {
  const { vote, elementId } = props;
  return (
    <div id={"vote-button-container-"+elementId} className="animated slideInUp vote-button">
      <Button
        id={'vote-button-'+elementId}
        bsStyle="primary"
        bsSize="large"
        onClick={vote}
        bsClass="vote-button-btn"
      >
        <i className="fas fa-arrow-alt-circle-up vote-up"></i>
      </Button>
    </div>
  )
}

export default Voting;

