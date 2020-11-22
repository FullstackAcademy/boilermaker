import React from 'react'
import {DropdownButton, Dropdown} from 'react-bootstrap'

const moods = [
  'Affirmation',
  'Chakara',
  'Joy',
  'Love',
  'Manifestation',
  'Relaxation'
]

const DropdownMood = props => {
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
    </div>
  )
}

export default DropdownMood
