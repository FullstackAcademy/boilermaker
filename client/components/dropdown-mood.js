import React, {useState} from 'react'
import {DropdownButton, Dropdown} from 'react-bootstrap'

const moods = [
  'Affirmation',
  'Chakara',
  'Joy',
  'Love',
  'Manifestation',
  'Relaxation'
]

//mini medi:
// Joy Happiness
{
  /* <iframe src="https://open.spotify.com/embed/playlist/7xkW7Xg5wkh5IaarIMY6Mj" width="300" height="380"}} frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe> */
}

//10 min or less
//  <iframe src="https://open.spotify.com/embed/playlist/0eAa4FyRTpxpkKsq6GynFG" width="300" height="380" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>

const DropdownMood = props => {
  const [embededPlayer, setEmbededPlayer] = useState(null)

  return (
    <div className="flex-row">
      <label
        htmlFor="mood"
        className="align-self-center m-1"
        style={{fontWeight: 'bold'}}
      >
        How do you want to feel?
      </label>

      <DropdownButton
        name="mood"
        title="Mood"
        className="m-1"
        variant="success"
      >
        {moods.map((mood, idx) => (
          <Dropdown.Item key={idx} href="#/action-1">
            {mood}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <iframe
        src="https://open.spotify.com/embed/playlist/0eAa4FyRTpxpkKsq6GynFG"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    </div>
  )
}

export default DropdownMood
