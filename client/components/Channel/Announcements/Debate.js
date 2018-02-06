import React from 'react';

const Debate = (props) => {
  const { debateStatus, phaseStatus } = props;
  return (
    <div>
      {
        phaseStatus === '_player1ToStart' &&
        <div id="announcement-debate-container">
          <h1 id="announcement-debate-headline">{debateStatus} will begin the debate</h1>
        </div>
      }
      {
        phaseStatus === '_player2ToStart' &&
        <div id="announcement-debate-container">
          <h1 id="announcement-debate-headline">{debateStatus} will now begin their rebuttal</h1>
        </div>
      }
    </div>
  )
}

export default Debate;