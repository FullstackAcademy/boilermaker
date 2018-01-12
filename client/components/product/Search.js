import React from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { search } from '../../store'

class SearchForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      searchTerm: '',
      isShowing: false
		}
	}

	onSearchSubmit() {
		//thunk
		const searchTerm = {
			searchTerm: this.state.searchTerm,
    }
    const searchResults = this.props.products.filter(product => (
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ))
	  this.props.searchProducts(searchResults)
	}

	render() {
		return this.state.isShowing ? (
			<div>
				<form onSubmit={() => this.onSearchSubmit()}>
					<input placeholder="noodles" onChange={(e) => this.setState({ searchTerm: e.target.value})} />
					<NavLink exact to="/shopall">
          <button type="submit">Submit Search</button>
          </NavLink>
					<button onClick={() => this.setState({ searchTerm: '', isShowing: false })}>Cancel</button>
				</form>
			</div>
		) : (
			<button onClick={() => this.setState({ isShowing: true })}>Search Products</button>
		)
	}
}
const mapState = (state) => {
	return {
		products: state.products
	}
}
const mapDispatch = (dispatch) => {
	return {
		searchProducts(searchTerm) {
			dispatch(search(searchTerm))
		}
	}
}
export default connect(mapState, mapDispatch)(SearchForm)
