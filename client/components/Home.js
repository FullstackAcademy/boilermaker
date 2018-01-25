import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createChannel, fetchChannels } from '../store';

const Home = (props) => {
    const { makeChannel, channels } = props;
    return (
        <div>
            {channels && 
            
                channels.map(channel => {
                    return(
                    <div key={channel.id}>
                        {channel.name}
                    </div>
                    )
                })
            
            }
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