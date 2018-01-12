import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddToCartButton from '../order/AddToCartButton'
import { NavLink } from 'react-router-dom'
import EditProductForm from './EditProductForm'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEditForm: false
     }
  }
  render() {

    const categoryId = this.props.match.params.categoryId
    const products = categoryId ? this.props.products.filter(product => product.categoryId === +categoryId) : this.props.products

    return (
        <div className="flex-container-wrap productListContainer" >
          {products.map( product => {
            return (
          <NavLink key={product.id} exact to={`/products/${product.id}`} className="productItemContainer">
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
                  <AddToCartButton item={product} />
                  {this.props.user.isAdmin ? <EditProductForm product={product} /> : <div />}
                  {/* {this.props.user.isAdmin ? <button onClick={(evt) => { evt.preventDefault()
                    this.setState({showEditForm: !this.state.showEditForm})}}>Edit Product</button>

          // : <div />}{this.props.user.isAdmin && this.state.showEditForm ? <EditProductForm product={product}/>: <div />} */}
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
    products: state.products,
    user: state.user
  }
}

export default connect(mapState)(ProductList)
