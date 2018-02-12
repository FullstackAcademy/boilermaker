import React from 'react'
import connect from 'react-redux'

const deleteButton = (props) => {


  return (
    <button onClick={() => props.handleDelete(props.item)}>Delete</button>

  )
}

export default deleteButton
