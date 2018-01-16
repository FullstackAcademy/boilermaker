import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postItem } from '../../store'
import {addLocalItems} from '../../store'

export class AddToCartButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantityEntry: '',
      // loggedIn: false,
      // clicked: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    let selections = [1,2,3,4,5,6,7,8,9,10];
    return (

      <form onSubmit={this.handleSubmit}>
        <div className="flex-container-column alignStart addCartContainer">
          <span>QUANTITY</span>
          <select name="quantity" value={this.state.quantityEntry} onChange={this.handleChange}>
            {
              selections.map(selection => <option key={selection}>{selection}</option>)
            }
          </select>
          <button type="submit">Add To Cart</button>
          {/* {!this.state.loggedIn && this.state.clicked && <div className="loginReminder">Please log in or sign up</div>} */}
        </div>
      </form>
    )
  }

  handleChange(event){
    this.setState({
      quantityEntry: event.target.value
    })
  }

// When 'add to cart' is clicked
// if the user is logged in, the added new item will be posted into backend to persist the data
// if the use is unauthenticated, the item will be added to local storage as object
   // also call action maker to update app state with the local storage
   // the reason for this is so that all components use local storage can re-render when local storage change such as Navbar
  handleSubmit(event){
    event.preventDefault()
    if (this.props.user) {
      this.setState({loggedIn: true});
      let item = {
				orderId: this.props.activeOrder.id,
        productId: this.props.productId,
        quantity: +this.state.quantityEntry,
        price: this.props.price,
			}
      this.props.addItems(item)

    } else {
      const productId = this.props.productId
      const quantity = +this.state.quantityEntry
      const price = this.props.price
      // this is the new item to add, which is an object
      let item = {productId, quantity, price}
      // this is the existing items already added by unauthorized user
      // localStorage is an array of objects(item)
      let existingLocalItems = localStorage.getArr("item") ||[];
      // This add the new item into the existing array of items in localStorage
      // This is tracking all items added to cart by unauthorized user
      localStorage.setObj("item", [item].concat(existingLocalItems));
      const allLocalItems = localStorage.getArr('item')
      this.props.addLocalItems(allLocalItems);
      }
    }
}

const mapState = (state, ownProps) => {
  return {
    productId: ownProps.item.id,
    price: ownProps.item.price,
		activeOrder: state.activeOrder,
		user: state.user
  }
}

const mapDispatch = (dispatch) => {
	return {
    addItems: (item) => {
			console.log(item)
			dispatch(postItem(item))
		},
    addLocalItems: (items) => dispatch(addLocalItems(items))
	}
}

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}
Storage.prototype.getArr = function(key) {
  return JSON.parse(this.getItem(key))
}
Storage.prototype.getUniqueKey = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

// Do not Delete this.  It is used to reset the localStorage
// localStorage.removeItem("item");


export default connect(mapState, mapDispatch)(AddToCartButton)
