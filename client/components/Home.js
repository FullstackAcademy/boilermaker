import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Welcome from './Home-Welcome';
import CategoryList from './Home-CategoryList';
import { createChannel, fetchChannels } from '../store';
import { uniqueChannelList } from '../../utils/uniqueChannels'

const Home = (props) => {
  const { makeChannel, channels, categoryList } = props;
  return (
    <div>
      <Welcome />
      <CategoryList categoryList={categoryList} />
    </div>
  )
}

const mapState = (state) => {
  const categoryList = uniqueChannelList(state.channels);
  return {
    categoryList,
    channels: state.channels
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatch)(Home));