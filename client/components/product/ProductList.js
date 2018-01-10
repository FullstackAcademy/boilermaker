import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() {

    const categoryId = this.props.match.params.categoryId
    const products = categoryId ? this.props.products.filter(product => product.id === +categoryId) : this.props.products

    return (
        <div className="flex-container-wrap green spaceBtw" >
          {products.map( product => {
            return <div className= "flex-container-column" key={product.id}>
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
