import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../../store/cart'
import _ from 'lodash'

let login=false;

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  componentDidMount(){
    if (this.props.userId) {
      login = true;
      this.props.getAllLineItems(this.props.userId);
    }

  }

  render() {
    console.log('this.props.items are---------', this.props.items)
    // const items = localStorage.getItem('item')
    // console.log('cartItems is----------', items)
    const items = this.props.items;

    return (
      <div className="flex-container-row alignStart">
        <div className="flex-container-column shoppingCartContainer marginTop" >
          <h1>CART</h1>
          <h2>PRODUCTS</h2>
          {
            items &&
            items.map( item => {

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
  const productArr =
  state.cartItems.map(item => {
    return state.products.find(product => product.id === +item.productId)
  })
  console.log('productARR is -------------', productArr)
  return {
    items: productArr,
    userId: state.user.id
  }
}

const mapStateUnauth = (state) => {
  const cartItems = localStorage.getArr('item')
  console.log('cartItems is----------', cartItems)
  console.log('cartItems type----------', typeof cartItems)
  // // console.log('state.products is----------', state.products)
  // const productArr =
  const items = cartItems.map(cartItem => {
    const productObj = state.products.find(product => product.id === cartItem.productId)
    return {...cartItem, ...productObj}
  })
  console.log('items are----------', items)
  return {
    items: items
  }
}

const mapDisptach = dispatch => {
  return {
    getAllLineItems(userId) {
      dispatch(fetchItems(userId))
    }
  }
}

Storage.prototype.getArr = function(key) {
  return JSON.parse(this.getItem(key))
}
// function getCookie(cname) {
//   var name = cname + "=";
//   var ca = document.cookie.split(';');
//   for(var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//           c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//           return c.substring(name.length, c.length);
//       }
//   }
//   return "";
// }

  export const authUserCart = connect(mapState, mapDisptach)(CartList)
  export const unAuthUserCart = connect(mapStateUnauth, mapDisptach)(CartList)
