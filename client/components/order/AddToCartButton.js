import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, postItem } from '../../store/cart'

export class AddToCartButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantityEntry: '',
      loggedIn: false,
      clicked: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    let selections = [1,2,3,4,5,6,7,8,9,10];
    return (
      <form onSubmit={this.handleSubmit}>
        <span>QUANTITY</span>
        <select name="quantity" value={this.state.quantityEntry} onChange={this.handleChange}>
          {
            selections.map(selection => <option key={selection}>{selection}</option>)
          }
        </select>
        <div className="flex-container-column">
          <button type="submit">Add To Cart</button>
          {!this.state.loggedIn && this.state.clicked && <div className="loginReminder">Please log in or sign up</div>}
          </ div>
      </form>
    )
  }

  handleChange(event){
    this.setState({
      quantityEntry: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.setState({clicked: true})
    if (this.props.userId) {
      this.setState({loggedIn: true});
      let item = {
        userId: this.props.userId,
        productId: this.props.productId,
        quantity: +this.state.quantityEntry,
        price: this.props.price};

      this.props.addItems(item)
    }
  }
}

const mapState = (state, ownProps) => {
  return {
    userId: state.user.id,
    productId: ownProps.item.id,
    price: ownProps.item.price
  }
}

const mapDispatch = (dispatch) => {
	return {
		addItems: (item) => dispatch(postItem(item))
	}
}

export default connect(mapState, mapDispatch)(AddToCartButton)
