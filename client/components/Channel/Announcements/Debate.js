import React from 'react';

const Debate = (props) => {
  const { debateStatus } = props;
  let test = true;
  return (
    <div>
      {
        test === false &&
        <div id="announcement-debate-container">
          <h1 id="announcement-debate-headline">Player 1 will begin the debate</h1>
        </div>
      }
      {
        test === true &&
        <div id="announcement-debate-container">
          <h1 id="announcement-debate-headline">Player 2 will now begin the debate</h1>
        </div>
      }
    </div>
  )
}

export default Debate;