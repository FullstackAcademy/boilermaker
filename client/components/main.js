import React from 'react'
import {Playlists, DropdownMood, Duration} from './index'
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
    return (
      <div className="flex-coloumn justify-content-center">
        <DropdownMood
          handleClick={this.handleClick}
          moods={this.props.intentions}
          getTrack={this.props.getTrack}
        />
        <Playlists
          id={this.props.user.spotifyId}
          playlists={this.props.playlists}
        />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  playlists: state.playlists,
  intentions: state.intentions
})

const mapDispatch = dispatch => ({
  getPlaylists: userId => dispatch(fetchPlaylists(userId)),
  getIntentions: () => dispatch(fetchIntentions()),
  getTrack: value => dispatch(fetchTrack(value))
})

export default connect(mapState, mapDispatch)(Main)
