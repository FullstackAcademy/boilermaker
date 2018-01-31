import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Welcome from './Welcome';
import CategoryList from './CategoryList';

const Home = (props) => {
  const { channels } = props;
  return (
    <div>
      <Welcome />
      <CategoryList channels={channels} />
    </div>
  )
}

const mapState = (state) => {

  return {
    channels: state.channels
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatch)(Home));