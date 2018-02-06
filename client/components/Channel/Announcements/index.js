import React from 'react';
import { } from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Debate from './Debate';
import Voting from './Voting';
import Winner from './Winner';

const Announcements = (props) => {
  const { status } = props;
  return (
    <div>
      {/* <Debate debateStatus={status.debate} /> */}
      {/* <Voting votingStatus={status.voting} /> */}
      <Winner winnerStatus={status.winner} />
    </div>
  )
}

export default Announcements;