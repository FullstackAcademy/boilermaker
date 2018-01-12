import React from 'react'
import { connect } from 'react-redux'
import { createReview } from '../../store'


class EditProductForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      name: this.props.product.name,
      image: this.props.product.image,
      price: this.props.product.price,
      description: this.props.product.description,
      inventoryCount: this.props.product.invetntoryCount,
      size: this.props.product.size,
      categoryId: this.props.product.categoryId,
      isShowing: false
    }
   // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
	}
  handleChange(event){
    event.preventDefault()
    console.log('hi')
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }
	// onReviewSubmit() {
	// 	//thunk
	// 	const review = {
	// 		rating: this.state.rating,
	// 		body: this.state.body,
	// 		productId: this.props.productId,
	// 		userId: this.props.user.id
	// 	}
	// 	this.props.createReview(review)
	// }

	render() {
		return this.state.isShowing ? (
			<div>
				<form onSubmit={(evt) => {
          evt.preventDefault()
          this.onReviewSubmit()
        } }>
          <input value={this.state.name} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="name" />
          <input value={this.state.image} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="image" />
          <input value={this.state.price} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="price" />
          <input value={this.state.description} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="description" />
          <input value={this.state.description} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="inventoryCount" />
          <input value={this.state.inventoryCount} onClick={(evt) => evt.preventDefault()} onChange={this.handleChange} name="size" />
					{/* <select value={this.state.rating} onChange={(e) => this.setState({ rating: e.target.value })}>
						<option>
							1
						</option>
						<option>
							2
						</option>
						<option>
							3
						</option>
						<option>
							4
						</option>
						<option>
							5
						</option>
					</select> */}
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
      }
      }>Edit Product</button>
		)
	}
}
const mapState = (state) => {
	return {
		user: state.user
	}
}
const mapDispatch = (dispatch) => {
	return {
		createReview(review) {
			dispatch(createReview(review))
		}
	}
}
export default connect(mapState, mapDispatch)(EditProductForm)
