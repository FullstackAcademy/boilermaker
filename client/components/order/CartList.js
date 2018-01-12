import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../../store/cart'

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  componentDidMount(){
    this.props.getAllLineItems(this.props.userId);
  }

  render() {

   const items = this.props.items
    return (
        <div className="flex-container-wrap green spaceBtw productListContainer" >
          {
            items&&
            items.map( item => {
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
    items: state.cartItems,
    userId: state.user.id
  }
}

const mapDisptach = dispatch => {
  return {
    getAllLineItems(userId) {
      dispatch(fetchItems(userId))
    }
  }
}

export default connect(mapState, mapDisptach)(CartList)
