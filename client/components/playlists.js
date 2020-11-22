import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchPlaylists} from '../store/playlists'

class Playlists extends React.Component {
  render() {
    return (
      <>
        <ListGroup>
          <ListGroup.Item>Playlist 1</ListGroup.Item>
        </ListGroup>
      </>
    )
  }
}

const mapState = state => ({
  playlists: state.playlists
})

const mapDispatch = dispatch => ({
  getPlaylists: userId => dispatch(fetchPlaylists(userId))
})

export default connect(mapState, mapDispatch)(Playlists)
