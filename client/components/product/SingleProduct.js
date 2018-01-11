import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReviewContainer from '../review/ReviewContainer'
import { getReviewsWithAverageThunk } from '../../store/index';
import AddToCartButton from '../order/AddToCartButton'

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    this.props.getReviewsWithAverageThunk();
  }

  render() {
    const product = this.props.product
		const { reviews, avg } = this.props.reviews
    console.log('rating is----------', this.props.rating3)
    return (
      <div>
        <div>
          {product &&
            <div className="marginTop flex-container-row  singleProductContainer">
            <div className="productImgContainer flex-container-column">
              <img src={`${product.image}`} />
              <span>{`AVERAGE REVIEW ${avg}`}</span>
            </div>
            <div className="flex-container-column singleProductInfoContainer">
              <div className="flex-container-column singleProductInfoContainerTop">
                <div>
                <span>{product.name}</span>
                <span>{`${product.size}-pack`}</span>
                </div>
                <div>
                  <AddToCartButton item={product} />
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
      <ReviewContainer reviews={reviews} />
    </div>
     )
  }
}

const mapState = (state, ownProps) => {
  const productId = ownProps.match.params.productId;

  return {
    product: state.products.find(product => product.id === +productId),
    reviews: state.reviews
  }

}

const mapDispatch = (dispatch, ownProps) => {
  const productId = +ownProps.match.params.productId
  return {
    getReviewsWithAverageThunk(){
      dispatch(getReviewsWithAverageThunk(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleProduct);
