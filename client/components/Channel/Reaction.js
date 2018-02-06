import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Reaction = (props) => {
  let { reaction } = props;
  return (
  <div id="reaction-box">
    {
      reaction && reaction.length > 0 &&
        <ReactCSSTransitionGroup
          transitionName="reaction"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={4000}>
          <div> {reaction} </div>
        </ReactCSSTransitionGroup>
    } 
  </div>
  )
}

const mapState = (state) => {
  return {
    reaction: state.reaction
  }
}

export default connect(mapState)(Reaction)
