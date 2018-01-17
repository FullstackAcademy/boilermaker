import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { fullFillOrder } from '../../store'

class OrderCheckout extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            newEmailEntry: "",
            newFirstNameEntry: "",
            newLastNameEntry: "",
            newCompanyEntry: "",
            newAddressEntry: "",
            newAptEntry: "",
            newCityEntry: "",
            newCountryEntry:"",
            newStateEntry:"",
            newZipEntry: "",
            newPhoneEntry: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

	render() {
        const { newEmailEntry, newFirstNameEntry, newLastNameEntry,
        newCompanyEntry, newAddressEntry, newAptEntry,
        newCityEntry, newZipEntry, newPhoneEntry} = this.state

        const {items} = this.props

        let subTotal = 0, total = 0
        items && items.forEach(item => {
            subTotal += item.price * item.quantity
        })

		return (
            <div className="flex-container-row alignStart">
                <div className= "flex-container-column shoppingCartContainer marginTop">
                    <form className="flex-container-column orderContainer" onSubmit={this.handleSubmit}>
                        <h3>Customer information</h3>
                        <input
                            value={newEmailEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newEmailEntry"
                            placeholder="Enter Your Email" />
                        <h3>Shipping Address</h3>
                        <input
                            value={newFirstNameEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newFirstNameEntry"
                            placeholder="First Name" />
                            <input
                            value={newLastNameEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newLastNameEntry"
                            placeholder="Last Name" />
                        <input
                            value={newCompanyEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newCompanyEntry"
                            placeholder="Company (optional)" />
                        <input
                            value={newAddressEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newAddressEntry"
                            placeholder="Address" />
                        <input
                            value={newAptEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newAptEntry"
                            placeholder="Apt, suite" />

                        <select name="newCountryEntry" value="newCountryEntry" onChange={this.handleChange}>
                            <option>United States</option>
                        </select>
                        <select name="newStateEntry" value="newStateEntry" onChange={this.handleChange}>
                            <option>State</option>
                        </select>

                        <input
                            value={newCityEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newCityEntry"
                            placeholder="City"/>
                        <input
                            value={newZipEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newZipEntry"
                            placeholder="Zip code"/>
                        <input
                            value={newPhoneEntry}
                            onChange={this.handleChange}
                            type="text"
                            name="newPhoneEntry"
                            placeholder="Phone (optional)"/>
                        <button type="submit">Continue to shipping method</button>
                    </form>
                </div>

                <div className="subtotalContainer">
                    <div>
                        Product Information
                        {
                            items && items.map(item =>
                                <div key={item.id}>
                                    <img className="cartImage" src={item.product.image}  />
                                    <div>
                                        {
                                            item.product.name
                                        }
                                    </div>
                                    <div>
                                    SubTotal:
                                        {
                                          ` $${item.price * item.quantity}`
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="giftCardContainer">
                        <input placeholder="Gift card or discount code"/>
                    </div>

                    <div>
                        <span>Subtotal ${subTotal}</span>
                    </div>

                    <div>
                        <div>Shipping - </div>
                    </div>

                    <div>
                        <div>Total ${subTotal}</div>
												<form onSubmit={(e) => this.handleSubmit(e)}>
													<button className= "orderBtn" type="submit">fullfill order</button>
												</form>
                    </div>
                </div>

			</div>
		)
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
				let isLoggedIn = this.props.user.id ? true : false
				this.props.fullFillOrder(this.props.activeOrder.id, this.props)

    }
}

const mapState = (state, ownProps) => {
    return {
        activeOrder: state.activeOrder,
				user: state.user,
				unAuthUser: state.unAuthUser
    }
}

const mapDispatch = (dispatch, ownProps) => {
	return {
		fullFillOrder(id, props) {
			dispatch(fullFillOrder(id, props))
		}
	}
}

export default connect(mapState, mapDispatch)(OrderCheckout)
