import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddToCartButton from '../order/AddToCartButton'
import { NavLink } from 'react-router-dom'
import EditProductForm from './EditProductForm'
import SearchForm from './Search'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const categoryId = this.props.match.params.categoryId
    let searchResults
    if (!categoryId){
      console.log('searchrrrrr', this.props.searchResults)
      searchResults = this.props.searchResults.length ? this.props.searchResults : null
    }

    const productsList = categoryId ? this.props.products.filter(product => product.categoryId === +categoryId) : this.props.products
    const products = searchResults || productsList

    return (
      <div>
      <SearchForm />
        <div className="flex-container-wrap productListContainer" >
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

export default connect(mapState)(ProductList)
