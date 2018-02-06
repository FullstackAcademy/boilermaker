import React from 'react';

const Voting = (props) => {
  const { debateStatus } = props;
  let test = true;
  return (
    <div>
      {
        test === false &&
        <div id="announcement-voting-container">
          <h1 id="announcement-voting-headline">Voting is now enabled</h1>
        </div>
      }
      {
        test === true &&
        <div id="announcement-voting-container">
          <h1 id="announcement-voting-headline">Voting is now disabled</h1>
        </div>
      }
    </div>
  )
}

export default Voting;