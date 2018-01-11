import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, postItem } from '../../store/cart'

export class AddToCartButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantityEntry: ''
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
        <button type="submit">Add To Cart</button>
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

    let item = {userId: this.props.userId,
      productId: this.props.productId,
      quantity: +this.state.quantityEntry,
      price: this.props.price};

    this.props.addItems(item)
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
