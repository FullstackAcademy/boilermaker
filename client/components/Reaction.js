import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const Reaction = (props) => {
  //const { reaction } = props;
  const reaction = 'What up';
  return reaction.length && (
    <ReactCSSTransitionGroup
      transitionName="reaction"
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionEnter={false}
      transitionLeaveTimeout={5000}>
      <div> {reaction} </div>
    </ReactCSSTransitionGroup>
  )
}

const mapState = (state) => {
  return {
    reaction: state.reaction
  }
}

export default connect(mapState)(Reaction)
