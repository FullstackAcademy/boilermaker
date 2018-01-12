import React from 'react'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { search } from '../../store'
import AddToCartButton from '../order/AddToCartButton'
import EditProductForm from './EditProductForm'
import InputBoxDoneTyping from 'react-input-box-done-typing'

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
	}


	onSearchSubmit(searchTerm) {

    let searchResults = this.props.products.filter(product => (
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ))
    if (!searchResults.length){
      searchResults = [{msg: 'Sorry, we do not have any products that match your search'}]
    }
    this.props.searchProducts(searchResults)
	}

	render() {
    const products = this.props.searchResults.length ? this.props.searchResults : this.props.products
		return (
			<div style={{marginTop: 100 }}>
				<InputBoxDoneTyping
               type="text"
               placeholder="Search Ramenzon"
               doneTyping={(val) => this.onSearchSubmit(val)}
               doneTypingInterval={100}
            />
        <div className="flex-container-wrap productListContainer" style={{marginTop: 30 }}>
          {products.map( product => {
            return product.msg ? <h3>{product.msg}</h3> : (
              <div key={product.id} className="productItemContainer">
                <NavLink  exact to={`/products/${product.id}`} >
                  <div className= "flex-container-column" >
                    <div className="productImage">
                      <img src={product.image}  />
                      </div>
                      <div className="flex-container-row spaceAround product">
                        <span>{product.name}</span>
                        <span>{`${product.size}-Pack`}</span>
                      </div>
                      <div>
                        <span>{`$ ${product.price}`}</span>
                      </div>
                    </div>
                  </NavLink>
                  <AddToCartButton item={product} />
                  {this.props.user.isAdmin ? <EditProductForm product={product} /> : <div />}
                </div>
              )
            })
          }
        </div>
			</div>
		)
	}
}
const mapState = (state) => {
	return {
    products: state.products,
    user: state.user,
    searchResults: state.searchResults
	}
}
const mapDispatch = (dispatch) => {
	return {
		searchProducts(searchTerm) {
			dispatch(search(searchTerm))
		}
	}
}
export default connect(mapState, mapDispatch)(Search)
