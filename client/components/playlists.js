import React from 'react'
import {Dropdown, Spinner, DropdownButton} from 'react-bootstrap'

const Playlists = ({playlists, id}) => {
  if (!playlists[0]) return <Spinner animation="border" />

  return (
    <div>
      <DropdownButton variant="secondary" title="Add to Playlist">
        <Dropdown.Item>New Playlist</Dropdown.Item>
        {playlists.map(playlist => (
          // <div key={playlist.id} className={playlist.id / 14  === 0? "col-sm" : ""}>
          <Dropdown.Item key={playlist.id}>{playlist.name}</Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  )
}

export default Playlists
