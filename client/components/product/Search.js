import React from 'react'
import {Redirect, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { search } from '../../store'

class SearchForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      searchTerm: '',
      isShowing: this.props.searchTerm
    }
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
	}


	onSearchSubmit(evt) {
    //thunk
    //evt.preventDefault()
		const searchTerm = this.state.searchTerm
    let searchResults = this.props.products.filter(product => (
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ))
    if (!searchResults.length){
      searchResults = [{msg: 'Sorry, we do not have any products that match you search'}]
    }

    this.props.searchProducts(searchResults)
    //this.setState({ searchTerm: ''})
	}

	render() {
    console.log('reset', this.props)
    console.log('stateTrerm', this.state.searchTerm)
		return this.state.isShowing ? (
			<div>
				<form>
					<input placeholder="noodles" onChange={(e) => this.setState({ searchTerm: e.target.value})} value={this.state.searchTerm}/>
          <NavLink exact to="/shopall" isActive={(evt) => this.onSearchSubmit(evt)}>
          <button>Submit Search</button>
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
    products: state.products,
    searchTerm: state.clearSearchBar
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
