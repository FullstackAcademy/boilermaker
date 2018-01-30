import React, { Component } from 'react';
import { fetchUser } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Image } from 'react-bootstrap';

class UserPage extends Component {
    componentDidMount() {
        this.props.loadUser(Number(this.props.match.params.userId))
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <Image src={user.photoURL} rounded className="user-page-user-image" />
                <h3>{user.name}</h3>
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