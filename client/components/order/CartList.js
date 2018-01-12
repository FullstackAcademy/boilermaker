import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../../store/cart'

let login=false;

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  componentDidMount(){
    if(this.props.userId) {
      login = true;
      this.props.getAllLineItems(this.props.userId);
    }

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

const mapStateUnauth = (state) => {
  console.log('checking productId======', getCookie("productId"))
  console.log('checking products======', state.products)
  console.log('checking mapStateUnauth======', state.products.find(product => product.id === getCookie("productId")))
  return {
    items: state.products.find(product => product.id === getCookie("productId"))
  }
}

const mapDisptach = dispatch => {
  return {
    getAllLineItems(userId) {
      dispatch(fetchItems(userId))
    }
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

  export const authUserCart = connect(mapState, mapDisptach)(CartList)
  export const unAuthUserCart = connect(mapStateUnauth)(CartList)
