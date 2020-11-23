import React from 'react'
import {DropdownButton, Dropdown} from 'react-bootstrap'

const duration = [5, 30, 60]

const Duration = props => {
  return (
    <div className="flex-row">
      <label
        htmlFor="duration"
        className="align-self-center m-1"
        style={{fontWeight: 'bold'}}
      >
        Duration
      </label>

      <DropdownButton
        name="duration"
        title="Minutes"
        className="m-1"
        variant="success"
      >
        {duration.map((time, idx) => (
          <Dropdown.Item key={idx} href="#/action-1">
            {time}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  )
}

export default Duration
