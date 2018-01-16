import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout, getCategoriesThunk, addLocalItems, postItem, getUsersThunk} from '../store'
import CategoryList from './CategoryList'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Navbar extends Component {
	constructor(props){
		super(props)
		this.state = {
      clicked: false
    }
		this.handleClick = this.handleClick.bind(this)
	}

  componentDidMount(){
    const allLocalItems = localStorage.getArr('item')
    this.props.addLocalItems(allLocalItems);

  }



	handleClick(){
		this.setState({clicked: !this.state.clicked});
		this.props.getCategories();
	}

  render(){
    const {children, handleClick, isLoggedIn, userId, isAdmin, getAllUsers} = this.props

		let cartUrl;
		if(isLoggedIn) cartUrl = '/authUserCart'
		else {
			cartUrl = '/unAuthUserCart'
    }

		let badge
    if (isLoggedIn && this.props.cartItems.length > 0) {
      badge = this.props.cartItems.length
    } else if (!isLoggedIn && this.props.localItems) {
      badge = this.props.localItems.length
    }
    return (
      <div className="flex-container-column navContainer">
        <div className="flex-container-row spaceBtw fullWidth topNavContainer">
          <div id="title">
            <NavLink exact to="/">
              <h2>RAMENZON</h2>
            </NavLink >
          </div>
        <div className="flex-container-row menuContainer spaceBtw">
          <div>
					<button id="shopBtn" className="fontSpecial fontBlack" onClick={this.handleClick}>SHOP</button>
          <NavLink exact to="/search">
          <button id="shopBtn" className="fontSpecial fontBlack">SEARCH</button>
          </NavLink>
					<span className="fontSpecial fontBlack">RAMEN STORY</span>
          </div>
					{
						isLoggedIn
						  ? <div>
						    {/* The navbar will show these links after you log in */}
						    <Link to="/logout" className="fontSpecial fontBlack" onClick={handleClick}>LOGOUT</Link>
                {isAdmin && <Link to="/users" className="fontSpecial fontBlack" onClick={getAllUsers}>   USERS</Link>}
						  </div>
						  : <div className="loginMenu flex-container-row spaceBtw">
						    {/* The navbar will show these links before you log in */}
						    <Link to="/login" className="fontSpecial fontBlack">LOGIN</Link>
						    <Link className="fontSpecial fontBlack " to="/signup">SIGNUP</Link>
						  </div>
					}
					<NavLink to={'/orders-history'}><span>My orders</span></NavLink>
					<div className="flex-container-row">
						<span><i className="material-icons">shopping_cart</i></span>
          <div className="badgeContainer">
              <span>
                {
                  badge
                }
              </span>
          </div>
						<NavLink exact to={cartUrl}>
							<div className="flex-container-row">
								<h3 className="fontBlack">CART</h3>

							</div>
						</NavLink>
					</div>

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
    isAdmin: state.user.isAdmin,
    cartItems: state.cartItems,
		localItems: state.localItems,
		userId: state.user.id
	}
}

const mapDispatch = (dispatch) => {
	return {
		handleClick () {
			dispatch(logout())
		},
		getCategories(){
			dispatch(getCategoriesThunk())
    },
    addLocalItems(items) {
      dispatch(addLocalItems(items))
    },
    getAllUsers() {
      dispatch(getUsersThunk())
    }
  }
}

Storage.prototype.getArr = function(key) {
  return JSON.parse(this.getItem(key))
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
