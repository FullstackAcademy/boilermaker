import React from 'react';
import { Modal } from 'react-bootstrap'

const Winner = (props) => {
  const { debateStatus } = props;
  let test = true;
  return (
    <div>
      {
        test === true &&
        <div id="announcement-winner-container">
          <h1 id="announcement-winner-headline">Player 2 has won!</h1>
        </div>
      }
    </div>
  )
}

export default Winner;