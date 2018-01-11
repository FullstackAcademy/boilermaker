import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout, getCategoriesThunk} from '../store'
import CategoryList from './CategoryList';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Navbar extends Component {
	constructor(){
		super()
		this.state = {clicked: false}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		this.setState({clicked: !this.state.clicked});
		this.props.getCategories();
	}

  render(){
    // const {children, handleClick, isLoggedIn} = props
    // console.log('clicked is --------------', clicked)
		let badge
		if (this.props.cartItems.length > 0) {
				badge = <h3 style={{ color: 'red' }}>{this.props.cartItems.length}</h3>
		}
    return (
      <div className="flex-container-column navContainer">
        <div className="flex-container-row spaceBtw fullWidth topNavContainer">
          <div id="title">
            <NavLink exact to="/">
              <h2>RAMENZON</h2>
            </ NavLink >
          </div>
        <div className="flex-container-row menuContainer spaceBtw">

					<button id="shopBtn" className="fontSpecial fontBlack" onClick={this.handleClick}>SHOP</button>

					<span className="fontSpecial fontBlack">RAMEN STORY</span>
					<span>FB</span>
					<span>TW</span>
					<span>EM</span>
					<NavLink to={'/orders'}><span>My orders</span></NavLink>
					<div className="flex-container-row">
						<span>cartlogo</span>
						<span>#</span>
						<NavLink exact to={'/cart-list'}>
							<div className="flex-container-row">
								<h3 className="fontBlack">CART</h3>
								{
									badge
								}
							</div>
						</NavLink>
					</div>
						{
							// !isLoggedIn
							//   ? <div>
							//     {/* The navbar will show these links after you log in */}
							//     <Link to="/home">Home</Link>
							//     <a href="#" onClick={handleClick}>Logout</a>
							//   </div>
							//   : <div>
							//     {/* The navbar will show these links before you log in */}
							//     <Link to="/login">Login</Link>
							//     <Link to="/signup">Sign Up</Link>
							//   </div>
						}
					</div>
				</div>
				{this.state.clicked && <CategoryList />}
			</div>
			)
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.user.id,
		cartItems: state.cartItems
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleClick () {
			dispatch(logout())
		},
		getCategories(){
			dispatch(getCategoriesThunk())
		}
	}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
	children: PropTypes.object,
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}
