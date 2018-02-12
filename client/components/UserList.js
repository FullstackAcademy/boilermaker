import React from 'react'
import { connect } from 'react-redux'
import { deleteUserThunk } from '../store'

const UserList = (props) => {
  return (
    <div className="marginTop">
    {props.users.map(user => {
      return (
          <div key={user.id}>
            <button id="deleteBtn" onClick={() => props.deleteUser(user.id)}><i className="material-icons">remove_circle</i>
            </button>
            <span>{user.email}    </span>
            <span>Admin Status: {user.isAdmin ? 'true' : 'false'}</span>
        </div>
      )
    })}
    </div>
  )
}

const mapState = (state) => {
  return {
    users: state.users
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteUser(id) {
      dispatch(deleteUserThunk(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserList)
