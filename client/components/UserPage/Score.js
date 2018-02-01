import React from 'react';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Score = (props) => {
  const { user } = props;
  const totalScore = (
    <Tooltip id="tooltip-bottom">
      <strong>{`Cred: ${user.score}`}</strong>
    </Tooltip>
  );

  let pointsToGo = user.score % 100 >= 75
    ?
    100 - (user.score % 100) + ' until next level'
    :
    (user.score % 100) + ' / 100'

  return (
    <div>
      <OverlayTrigger placement="bottom" overlay={totalScore}>
        <ProgressBar bsStyle="success" active now={user.score % 100} label={pointsToGo} />
      </OverlayTrigger>
    </div>
  )
}

export default Score;