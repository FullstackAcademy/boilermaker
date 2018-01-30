import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { createChannel, fetchChannels } from '../store';
import Timer from './Timer';
import { CreateChannel } from './index'

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
      <CreateChannel />
      <form onSubmit={makeChannel}>
        <input
          type='text'
          name='name'
        />
        <button type='submit'> Submit </button>
      </form>
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