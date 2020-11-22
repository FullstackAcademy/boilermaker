import React from 'react'
import {
  ListGroup,
  Card,
  Dropdown,
  Spinner,
  DropdownButton
} from 'react-bootstrap'
import {connect} from 'react-redux'
import {play} from '../../server/auth/spotify-player'
import {fetchPlaylists} from '../store/playlists'

class Playlists extends React.Component {
  componentDidMount() {
    this.props.getPlaylists(this.props.user.spotifyId)
  }

  render() {
    const playlists = this.props.playlists

    if (!playlists[0]) return <Spinner animation="border" />

    return (
      <div>
        <DropdownButton variant="secondary" title="Add to Playlist">
          <Dropdown.Item>New Playlist</Dropdown.Item>
          {this.props.playlists.map(playlist => (
            // <div key={playlist.id} className={playlist.id / 14  === 0? "col-sm" : ""}>
            <Dropdown.Item key={playlist.id}>{playlist.name}</Dropdown.Item>
          ))}
        </DropdownButton>
        {/* <Card style={{width: "50%", height: "25%"}}>

            <Card.Body className="overflow-auto">
            <Card.Title>
                Your Playlists
              </Card.Title>
              {this.props.playlists.map((playlist) => (
                // <div key={playlist.id} className={playlist.id / 14  === 0? "col-sm" : ""}>
                <Card.Text key={playlist.id}>
                  {playlist.name}
                </Card.Text>
                // </div>
              ))}
            </Card.Body>
          </Card> */}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  playlists: state.playlists
})

const mapDispatch = dispatch => ({
  getPlaylists: userId => dispatch(fetchPlaylists(userId))
})

export default connect(mapState, mapDispatch)(Playlists)
