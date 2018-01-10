import React, { Component } from 'react'
import { connect } from 'react-redux'

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() {

   const items = this.props.items

    console.log('this.props.products--------------', this.props.products)
    return (
        <div className="flex-container-wrap green spaceBtw productListContainer" >
          {items.map( item => {
            return <div className= "flex-container-column productItemContainer" key={item.id}>
              <div className="productImage">
                <img src={item.image}  />
                </div>
                <div className="flex-container-row spaceAround product">
                  <span>{item.name}</span>
                  <span>{`${item.size}-Pack`}</span>
                </div>
                <div>
                  <span>{`$ ${item.price}`}</span>
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
    items: state.cartItems
  }
}

export default connect(mapState)(CartList)
