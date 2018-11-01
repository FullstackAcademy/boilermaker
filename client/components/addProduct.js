import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/products'

class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      imageUrl: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addProduct(this.state)
    this.setState({
      name: '',
      price: '',
      imageUrl: '',
      description: ''
    })
  }
  //please
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <form id="add-product-form" onSubmit={this.handleSubmit}>
        <span>Name:</span>
        <input
          className="form-control"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="product name here"
        />
        <span>Price:</span>
        <input
          className="form-control"
          type="text"
          name="price"
          value={this.state.price}
          onChange={this.handleChange}
          placeholder="product address here"
        />
        <span>Image:</span>
        <input
          className="form-control"
          type="text"
          name="imageUrl"
          value={this.state.imageUrl}
          onChange={this.handleChange}
          placeholder="product image url here"
        />
        <span>Description:</span>
        <input
          className="form-control"
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="product description here"
        />

        <button
          className="button-default"
          type="submit"
          disabled={!this.state.name || !this.state.price ? true : false}
        >
          Submit
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: info => dispatch(addProductThunk(info))
  }
}

const ConnectedAddProduct = connect(
  null,
  mapDispatchToProps
)(AddProductForm)

export default ConnectedAddProduct
