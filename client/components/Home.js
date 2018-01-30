import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { createChannel, fetchChannels } from '../store';
import { uniqueChannelList } from '../../utils/uniqueChannels'

const Home = (props) => {
  const { makeChannel, channels, categoryList } = props;
  return (
    <div>
      <ul>
        {
          categoryList.map(categoryName => {
            return (
              <li key={categoryName}>
                <NavLink to={`/categories/${categoryName}/channels`} >
                  <h1>
                    {categoryName}
                  </h1>
                </NavLink>
              </li>
            )
          })
        }
      </ul>
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