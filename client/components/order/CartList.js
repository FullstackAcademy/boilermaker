import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchItems, me, deleteItemThunk, updateItemThunk } from '../../store'
import { Link } from 'react-router-dom'
// import _ from 'lodash'
// import RaisedButton from 'material-ui/RaisedButton';

let login = false;

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    if (this.props.user) {
      login = true;
      this.props.getAllCartItems(this.props.user.id);
    }

  }

	componentWillReceieveProps(newProps) {
			this.props.getAllCartItems(this.props.activeOrder.id);
	}

  // onclick function to call thunk to delete item

// onChange funcation for select to call thunk to update item quantity
  handleChange(evt, itemId){
    evt.preventDefault()
    const quantity = evt.target.value
    this.props.updateItem(itemId, quantity)
  }

  render() {

    const items = this.props.items;
    console.log('items =======', items);
    let selections = [1,2,3,4,5,6,7,8,9,10];
    return (
      <div className="flex-container-row alignStart">
        <div className="flex-container-column shoppingCartContainer marginTop" >
          <h1>CART</h1>
          <h2>PRODUCTS</h2>
          {
          items && items.map( item => {
            return (
            <div className= "flex-container-column" key={item.id}>
                <div >
                <img className="cartImage" src={item.product.image}  />
                </div>
                <div className="flex-container-row spaceBtw product">
                  <span>{item.product.name}</span>
                  <span>{`${item.product.size}-Pack`}</span>
                </div>

                <button id="deleteBtn" onClick={() => this.props.deleteItem(item.id)}><i className="material-icons">remove_circle</i>
                </button>

                <select name="quantity" defaultValue={item.quantity} onChange={(evt)=> this.handleChange(evt, item.id)}>
                  {
                    selections.map(selection => <option key={selection}>{selection}</option>)
                  }
               </select>

                <div>
                  <span>{`$ ${item.price}`}</span>
                </div>
              </div>
              )
          })

          }
        </div>
        <div className="subtotalContainer">
          <h2>SUBTOTAL</h2>
          <div >Order Summary</div>
          <div>Excluding tax shipping</div>
          <div>Note to Ramenzon</div>
          <input />
          <Link to="/orders-checkout">
            <button>CHECKOUT</button>
          </Link>
      </div>
    </div>
    )
  }
}


const mapState = (state) => {
  return {
    items: state.cartItems,
    activeOrder: state.activeOrder
  }
}

const mapStateUnauth = (state) => {
  const localItems = localStorage.getArr('item') || []
  const items = localItems.map(localItem => {
    const productObj = state.products.find(product => product.id === localItem.productId)
    return {...localItem, ...productObj}
  })
  return {
    items: items
  }
}

const mapDisptach = dispatch => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    getAllCartItems(orderId) {
      dispatch(fetchItems(orderId))
    },
    deleteItem(itemId){
      dispatch(deleteItemThunk(itemId))
    },
    updateItem(itemId, quantity){
      dispatch(updateItemThunk(itemId, quantity))
    }
  }
}

Storage.prototype.getArr = function(key) {
  return JSON.parse(this.getItem(key))
}

  export const authUserCart = connect(mapState, mapDisptach)(CartList)
  export const unAuthUserCart = connect(mapStateUnauth, mapDisptach)(CartList)
