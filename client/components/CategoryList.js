import React from 'react';
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import category from '../store/category'
import { search } from '../store'
import product from '../store/product';

export const FrontPage = (props) => {

  return (
    <div className="flex-container-row spaceBtw categoryContainer">
      <NavLink exact to='/shopall' isActive={() => props.removeSearchFilter([])}>
      <span className="fontSpecial categoryName" onClick={() => props.removeSearchFilter([])}>all</span>
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

const mapDispatch = (dispatch) => {
  return {
    removeSearchFilter(searchTerm) {
      dispatch(search(searchTerm))
    }
  }
}

export default connect(mapState, mapDispatch)(FrontPage);
