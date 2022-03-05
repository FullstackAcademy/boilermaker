import React, {useState} from 'react'
import { Dropdown } from 'react-bootstrap'




const FilterPizzas = (props) => {
  
  const {pizzas} = props
   console.log('filtering...', pizzas)
  return (
   
    <div>
      <Dropdown>
        <Dropdown.Toggle variant='success' id='filterdropdown'>
          <p>selection</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {pizzas.map((pizza) => {
            return (
               <Dropdown.Item
            key={pizza.id}
            value={pizza.cityOfPizza}
            >
              {pizza.cityOfPizza}
            </Dropdown.Item>
            )
           
          })}
        </Dropdown.Menu>
      </Dropdown>
      
    </div>

  )
}

export default FilterPizzas