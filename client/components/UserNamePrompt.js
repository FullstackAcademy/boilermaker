import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';



class UserNamePropmt extends Component {

    CreateUsername(evt) {
        evt.preventDefault();
        axios.put(`/api/users/${this.props.user.id}`, {
            userName: evt.target.username.value
        })
        //might want to dispatch to the store here but ran out of time
        .catch(console.error)
    }

    render() {
        return (
            <div>
                {
                    this.props.user.username ? null :
                        <div>
                            <h3>{this.props.user.name}, don't have a username</h3>
                            <form onSubmit={this.CreateUsername.bind(this)}>
                                <label name="username">Username</label>
                                <input name="username" type="text" />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapState)(UserNamePropmt));
