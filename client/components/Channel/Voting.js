import React from 'react';
import { Button } from 'react-bootstrap';

const Voting = (props) => {
  const { vote, id, title } = props;

  return (
    <div className="animated slideInUp vote-button">
      <Button
        id={id}
        bsStyle="success"
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