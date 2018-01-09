import React from 'react';
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import category from '../store/category'

export const FrontPage = (props) => {
  console.log('props is----------', props)
  return (
    <div className="flex-container-row spaceBtw categoryContainer">
      <NavLink exact to='/shopall'>
      <span>all</span>
      </NavLink>


    {
      props.categories && props.categories.map(
        category => {
        return (
        <NavLink key={category.name} exact to={`/category/${category.id}`}>
          <span >{category.name}</span>
        </NavLink>
        )
      })
    }

    </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(mapState)(FrontPage);
