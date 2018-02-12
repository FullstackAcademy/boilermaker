import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddToCartButton from '../order/AddToCartButton'
import { NavLink } from 'react-router-dom'
import EditProductForm from './EditProductForm'


class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
		}
  }

  render() {

    const categoryId = this.props.match.params.categoryId
    const products = categoryId ? this.props.products.filter(product => product.categoryId === +categoryId) : this.props.products
		// let addProduct = this.props.user.isAdmin ? <div><button onClick={() => this.addProduct() }>add product</button></div> : <div></div>
		let addProductForm = <EditProductForm isCreate={true} product={{name: '', image: '', price: 0, description: '', inventoryCount: 0, size: 0, categoryId: 1, isShowing: false }} />
		let addCategory = <button>Add Category</button>
    return (
        <div style={{marginTop: 100 }}>
					{ this.props.user.isAdmin ? addProductForm : <div></div> }
					<div style={{marginTop: 30 }} className="flex-container-wrap productListContainer">
	          {products.map( product => {
	            return  (
	              <div key={product.id} className="productItemContainer">
	                <NavLink  exact to={`/products/${product.id}`} className="productItemInnerContainer" >
	                  <div className= "flex-container-column" >
	                    <div className="productImage">
	                      <img src={product.image}  />
	                      </div>
	                      <div className="flex-container-row flexStart product">
	                        <span className="fontBlack">{product.name}</span>
	                        <span className="fontBlack">{`${product.size}-Pack`}</span>
	                        <span className="fontBlack productPrice">{`$ ${product.price}`}</span>
	                      </div>
	                      {/* <div className="textLeft fullWidth priceContainer">

	                      </div> */}
	                    </div>
	                  </NavLink>
	                  <AddToCartButton item={product} />
	                  {this.props.user.isAdmin ? <EditProductForm isCreate={false} product={product} /> : <div />}
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
    user: state.user
  }
}

export default connect(mapState)(ProductList)
