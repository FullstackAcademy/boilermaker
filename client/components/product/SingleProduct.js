import React, { Component } from 'react';
import {connect} from 'react-redux'

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const product = this.props.product
    return (
      <div>
      {product &&
        <div className="marginTop flex-container-row spaceBtw">
        <div className="productImgContainer"><img src={`${product.image}`} /></div>
        <div className="flex-container-column">
          <div>
            <span>{product.name}</span>
            <span>{`${product.size}-pack`}</span>
            <div>
              <div>
                <span>QUANTITY</span>
                <input type= "text" placeHolder="1"/>
              </div>
              <button>ADD TO CART</button>
            </div>
          </div>
          <div>
            <h4>*FREE SHIPPING ON ORDERS OVER $50</h4>
            <h4>*ORDERS PLACED BY 3PM EST SHIP SAME DAY</h4>
            <span>{product.description}</span>
          </div>
        </div>
      </div>
      }
    </div>
     )
  }
}

const mapState = (state, ownProps) => {
  console.log('running')
  console.log('ownprops is ------------', ownProps)
  const productId = ownProps.match.params.productId;

  return {
    product: state.products.find(product => product.id === +productId)
  }
}

export default connect(mapState, null)(SingleProduct);
