import React, { Component } from 'react';
import { fetchUser } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import Score from './UserPage-Score';

class UserPage extends Component {
    componentDidMount() {
        this.props.loadUser(Number(this.props.match.params.userId))
    }

    render() {
        const { user } = this.props;

        return (
            <div className="user-page-header">
                <Image src={user.photoURL} rounded className="user-page-user-image" />
                <div className="user-page-header-text">
                    <h1>{user.name}</h1>
                    <h3>Cred</h3>
                    <h4>Level: {Math.floor(user.score / 100)}</h4>
                    <h5>Level progress</h5>
                    <Score user={user} />
                    {/*current room*/}
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.inactiveUser
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadUser(id) {
            dispatch(fetchUser(id))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));