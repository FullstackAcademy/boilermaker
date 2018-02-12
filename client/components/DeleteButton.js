import React from 'react'
import connect from 'react-redux'

const DeleteButton = (props) => {


  return (
    <button onClick={() => props.handleDelete(props.item)}>Delete</button>

  )
}

export default DeleteButton
