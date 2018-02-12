import React from 'react';
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import CategoryForm from './CategoryForm'
import { deleteCategoryThunk } from '../store'
import deleteButton  from './DeleteButton'

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
        <div key={category.name}>
          <NavLink exact to={`/category/${category.id}`}>
            <span className="fontSpecial categoryName">{category.name}</span>
          </NavLink>
          <deleteButton item={category} handleDelete={deleteCategoryThunk} />
        </div>
        )
      })
    }
		{ props.user.isAdmin ? <CategoryForm /> : <div></div> }
    </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories,
    products: state.products,
		user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCategoryFunc (category) {
      dispatch(deleteCategoryThunk(category))
    }
  }
}

export default connect(mapState, mapDispatch)(FrontPage)
