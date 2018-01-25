import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { createChannel } from '../store';

const Home = (props) => {
    const { makeChannel } = props;
    return (
        <div>
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

const mapDispatch = (dispatch) => {
    return {
        makeChannel(evt) {
            dispatch(createChannel({
                name: evt.target.name.value
            }))
        }
    }
}

export default withRouter(connect(null, mapDispatch)(Home));