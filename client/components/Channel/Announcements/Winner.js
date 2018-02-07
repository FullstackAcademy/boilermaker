import React from 'react';

const Winner = (props) => {
  const { winnerStatus } = props;
  return (
    <div>
      {
        winnerStatus !== false && winnerStatus !== '_tie' &&
        <div id="announcement-winner-container">
          <h1 id="announcement-winner-headline">{winnerStatus} has won!</h1>
        </div>
      }
      {
        winnerStatus === "_tie" &&
        <div id="announcement-winner-container">
          <h1 id="announcement-winner-headline">It was a draw!</h1>
        </div>
      }
    </div>
  )
}

export default Winner;