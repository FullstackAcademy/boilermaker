import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

export class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() {

    const categoryId = this.props.match.params.categoryId
    const products = categoryId ? this.props.products.filter(product => product.categoryId === +categoryId) : this.props.products

    return (
        <div className="flex-container-wrap green spaceBtw productListContainer" >
          {products.map( product => {
            return (
          <NavLink key={product.id} exact to={`/products/${product.id}`}>
            <div className= "flex-container-column productItemContainer" >
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
            )
          })
          }
        </div>


    )
  }
}


const mapState = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapState)(ProductList)
