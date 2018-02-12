
import React from 'react'
import { connect } from 'react-redux'
import { createCategoryThunk } from '../store'


class CategoryForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			category: ''
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.createCategory({name: this.state.category})
	}

	render() {
		return (
			<div>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input placeholder="add category" onChange={(e) => this.setState({ category: e.target.value })} />
					<button type="submit">submit</button>
				</form>
			</div>
		)
	}
}

const mapDispatch = (dispatch) => {
	return {
		createCategory(category) {
			dispatch(createCategoryThunk(category))
		}
	}
}
export default connect(null, mapDispatch)(CategoryForm)
