import React from 'react'
import { connect } from 'react-redux'
import { getCategoriesThunk, editProductThunk, createProductThunk } from '../../store'


class EditProductForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      name: this.props.product.name,
      image: this.props.product.image,
      price: this.props.product.price,
      description: this.props.product.description,
      inventoryCount: this.props.product.inventoryCount,
      size: this.props.product.size,
      categoryId: this.props.product.categoryId,
      isShowing: false
    }
    this.onEditSubmit = this.onEditSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
	}
  handleChange(event){
    event.preventDefault()
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }
	//thunk
	onEditSubmit(e) {
    //const id = this.props.product.id
		e.preventDefault()
		const data = {
			name: this.state.name,
			image: this.state.image,
      price: this.state.price * 100,
      description: this.state.description,
      size: this.state.size,
      inventoryCount: this.state.inventoryCount,
      categoryId: this.state.categoryId
		}
		if (!this.props.isCreate) {
			this.props.editProduct(data, this.props.product.id)
		} else {
			this.props.createProduct(data)
		}
	}

	render() {

		return this.state.isShowing ? (
			<div>
				<form onSubmit={(e) => this.onEditSubmit(e)}>
              <p style={{marginBottom: 0}}>Name</p>
              <input value={this.state.name} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="name" />
              <p style={{marginBottom: 0}}>Image</p>
              <input value={this.state.image} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="image" />
              <p style={{marginBottom: 0}}>Price</p>
              <input value={this.state.price} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="price" />
              <p style={{marginBottom: 0}}>Description</p>
              <textarea value={this.state.description} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="description" />
              <p style={{marginBottom: 0}}>Inventory Count</p>
              <input value={this.state.inventoryCount} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="inventoryCount" />
              <p style={{marginBottom: 0}}>Size</p>
              <input value={this.state.size} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="size" />
              <p style={{marginBottom: 0}}>Category</p>
              <select
              name="Category"
              defaultValue={this.state.categoryId}
              onClick={(evt) => evt.preventDefault()}
              onChange={this.handleChange}>
              {this.props.categories.map(category => {
                return (
              <option key={category.id}  value={category.id}>
                    {category.name}
                    </option>)
              })}
            </select>
					<button type="submit">Submit</button>
					<button onClick={(evt) => {
        evt.preventDefault()
        this.setState({ isShowing: false })
      }
      }>Cancel</button>
				</form>
			</div>
		) : (
			<button onClick={(evt) => {
        evt.preventDefault()
        this.setState({ isShowing: true })
        this.props.getCategories()
      }
		}>{ this.props.isCreate ? 'Add Product' : 'Edit Product'}</button>
		)
	}
}
const mapState = (state) => {
	return {
		categories: state.categories
	}
}
const mapDispatch = (dispatch) => {
	return {
		getCategories(){
			dispatch(getCategoriesThunk())
    },
    editProduct(data, id){
      dispatch(editProductThunk(data, id))
    },
		createProduct(product){
			dispatch(createProductThunk(product))
		}
	}
}
export default connect(mapState, mapDispatch)(EditProductForm)
