import React from 'react';
import { Button } from 'react-bootstrap';

const Voting = (props) => {
  const { changeVote1, changeVote2 } = props;


  return (
    <div className="animated slideInUp">
      <div>
        <Button
          id="vote-1"
          bsStyle="primary"
          bsSize="large"
          onClick={changeVote1}
        >
          VOTE 1
        </Button>
      </div>
      <div>
        <Button
          id="vote-2"
          bsStyle="primary"
          bsSize="large"
          onClick={changeVote2}
        >
          VOTE 2
        </Button>
      </div>
    </div>
  )
}

export default Voting;