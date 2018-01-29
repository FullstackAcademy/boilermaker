import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { createChannel, fetchChannels } from '../store';
import Timer from './Timer';

const Home = (props) => {
  const { makeChannel, channels } = props;
  return (
    <div>
      <Timer />
      <ul>
        {channels &&
          channels.map(channel => {
            return (
              <li key={channel.id}>
                <NavLink to={`/channels/${channel.id}`} >
                  {channel.name}
                </NavLink>
              </li>
            )
          })

        }
      </ul>
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
  return {
    channels: state.channels
  }
}

const mapDispatch = (dispatch) => {
  return {
    makeChannel(evt) {
      dispatch(createChannel({
        name: evt.target.name.value
      }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Home));