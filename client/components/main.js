import React from 'react'
import {Playlists, DropdownMood, Duration, MeditationPlaylist} from './index'
import {fetchPlaylists} from '../store/playlists'
import {connect} from 'react-redux'
import {fetchIntentions} from '../store/intentions'
import {fetchTrack} from '../store/track'

class Main extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getPlaylists(this.props.user.spotifyId)
    this.props.getIntentions()
  }

  handleClick(searchValue) {}

  render() {
    console.log(this.props.user.spotifyId)
    return (
      <div className="flex-coloumn justify-content-center">
        <DropdownMood
          handleClick={this.handleClick}
          moods={this.props.intentions}
          getTrack={this.props.getTrack}
        />
        {this.props.track.id ? (
          <MeditationPlaylist
            currentPlaylist={this.props.track}
            playlists={
              <Playlists
                playlists={this.props.playlists}
                className="m-1"
                postPlaylist={this.props.postPlaylist}
              />
            }
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  playlists: state.playlists,
  intentions: state.intentions,
  track: state.track
})

const mapDispatch = dispatch => ({
  getPlaylists: userId => dispatch(fetchPlaylists(userId)),
  getIntentions: () => dispatch(fetchIntentions()),
  getTrack: value => dispatch(fetchTrack(value)),
  postPlaylist: playlist => dispatch(sendPlaylist(playlist))
})

export default connect(mapState, mapDispatch)(Main)
