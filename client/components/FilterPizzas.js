import React from 'react'
import { Dropdown } from 'react-bootstrap'


const FilterPizzas = (props) => {
  const {pizzaCities, setSelected} = props
  pizzaCities.unshift('All')
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant='success' id='filterdropdown'>
          <p>selection</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {pizzaCities.map((city, i) => {
            return (
               <Dropdown.Item
            key={i}
            value={city}
            onClick={(event) => {
              console.log(event.target.text)
              setSelected(event.target.text)
            }}
            >
              {city}
            </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default FilterPizzas