import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, me } from '../../store'
// import _ from 'lodash'

let login = false;

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  componentWillReceiveProps(){
    // this.props.loadInitialData();
    if (this.props.userId) {
      login = true;
      this.props.getAllCartItems(this.props.userId);
    }

  }

  render() {

    const items = this.props.items;
    console.log('items are---------', items)
    return (
      <div className="flex-container-row alignStart">
        <div className="flex-container-column shoppingCartContainer marginTop" >
          <h1>CART</h1>
          <h2>PRODUCTS</h2>
          {
          items && items.map( item => {
            return <div className= "flex-container-column" key={item.id}>
                <div >
                <img className="cartImage" src={item.image}  />
                </div>
                <div className="flex-container-row spaceAround product">
                  <span>{item.name}</span>
                  <span>{`${item.size}-Pack`}</span>
                </div>
                <div>{item.quantity}</div>
                <div>
                  <span>{`$ ${item.price}`}</span>
                </div>
              </div>
          })
          }
        </div>
        <div className="subtotalContainer">
          <h2>SUBTOTAL</h2>
          <div >Order Summary</div>
          <div>Excluding tax shipping</div>
          <div>Note to Ramenzon</div>
          <input />
          <button>CHECKOUT</button>
      </div>
    </div>
    )
  }
}


const mapState = (state) => {
  console.log('state.cartItems is -------------', state.cartItems)
  const productArr =
  state.cartItems.map(item => {
    return state.products.find(product => product.id === +item.productId)
  })
  console.log('state.user.id is -------------', state.user.id)
  console.log('productARR is -------------', productArr)
  return {
    items: productArr,
    userId: state.user.id
  }
}

const mapStateUnauth = (state) => {
  const localItems = localStorage.getArr('item') || []
  // console.log('cartItems is----------', cartItems)
  // console.log('cartItems type----------', typeof cartItems)
  // // console.log('state.products is----------', state.products)
  // const productArr =
  const items = localItems.map(localItem => {
    const productObj = state.products.find(product => product.id === localItem.productId)
    return {...localItem, ...productObj}
  })
  // console.log('items are----------', items)
  return {
    items: items
  }
}

const mapDisptach = dispatch => {
  console.log('dispath 1 is called------------')
  return {
    loadInitialData () {
      dispatch(me())
    },
    getAllCartItems(userId) {
      console.log('dispath 2 is called------------')
      dispatch(fetchItems(userId))
    }
  }
}

Storage.prototype.getArr = function(key) {
  return JSON.parse(this.getItem(key))
}

  export const authUserCart = connect(mapState, mapDisptach)(CartList)
  export const unAuthUserCart = connect(mapStateUnauth, mapDisptach)(CartList)
