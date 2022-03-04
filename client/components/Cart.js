import React from 'react'
import {connect} from 'react-redux'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {updateCart, deletePizza} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.loading = true
    this.state = {
      cart: this.props.cart,
    }
    this.changeQuantity = this.changeQuantity.bind(this)
    this.deletePizza = this.deletePizza.bind(this)
  }

  changeQuantity(event) {
    const pizzaId = Number(event.target.name)
    const targetPizza = this.props.cart.filter(pizza => {
      return pizza.id === pizzaId
    })[0]
    targetPizza.quantity = event.target.value
    this.props.updateCart(targetPizza)
  }

  deletePizza(id) {
    this.props.deletePizza(id)
  }

  componentDidMount() {
    this.loading = false
    this.setState({
      cart: this.props.cart
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cart !== this.props.cart) {
      this.setState({cart: this.props.cart})
    }
  }

  render() {
    const pizzas = this.state.cart.length > 0 ? this.state.cart : []
    return this.loading ? (
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png" />
    ) : (
      <div id="cart-page">
      <div className="cart">
        <h1>Cart</h1>
        <Table striped border hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {pizzas.map(pizza => {
              return (
                <tr key={pizza.id}>
                  <td>{pizza.name}</td>
                  <td>
                    <input
                      type="number"
                      name={pizza.id}
                      className="cart-item-quantity"
                      value={pizza.quantity}
                      min="1"
                      onChange={this.changeQuantity}
                    />
                  </td>
                  <td>${Math.round(pizza.quantity * pizza.price * 100) / 100}</td>
                  <td className="delete-pizza" onClick={() => this.deletePizza(pizza.id)}>delete</td>
                </tr>
              )
            })}
            <tr><td>Total: </td><td/><td>$
            {pizzas.length > 0
              ? Math.round(
                  pizzas.reduce((prev, pizza) => {
                    return prev + pizza.quantity * pizza.price
                  }, 0) * 100
                ) / 100
              : 0}</td><td/></tr>
          </tbody>
        </Table>
      </div>
        <div id="checkout-section">
          <div />
          <Button variant="success">Checkout!</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: pizza => dispatch(updateCart(pizza)),
    deletePizza: id => dispatch(deletePizza(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
