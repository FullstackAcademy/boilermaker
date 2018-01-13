import React from 'react';
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'


export const FrontPage = (props) => {

  return (
    <div className="flex-container-row spaceBtw categoryContainer">
      <NavLink exact to='/shopall'>
      <span className="fontSpecial categoryName">ALL</span>
      </NavLink>


    {
      props.categories && props.categories.map(
        category => {
        return (
        <NavLink key={category.name} exact to={`/category/${category.id}`}>
          <span className="fontSpecial categoryName">{category.name}</span>
        </NavLink>
        )
      })
    }
    </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories,
    products: state.products
  }
}


export default connect(mapState)(FrontPage);
