import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {addCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

// const PizzaCard = props => {
//   const {pizza} = props
//   return (
//     // <div className="pizza-card">
//     //   <img src={pizza.imageUrl} alt={pizza.name} />
//     //   <h3>Name: {pizza.name}</h3>
//     //   <h3>Description: {pizza.description || ''}</h3>
//     //   <h3>Price: {pizza.price}</h3>
//     // </div>
// <div>
//   <Card style={{width: '18rem'}}>
//     <Link to={`/${pizza.id}`}>
//       <Card.Img variant="top" src={pizza.imageUrl} />
//     </Link>
//     <Card.Body>
//       <Card.Title>{pizza.name}</Card.Title>
//       <Card.Text>{pizza.description}</Card.Text>
//       <Card.Text>{pizza.price}</Card.Text>
//       <Button variant="danger">Add to Cart</Button>
//     </Card.Body>
//   </Card>
// </div>
//   )
// }

class PizzaCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.pizza,
      quantity: 1
    }
    this.inCart = false
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addCart(this.state)
    this.inCart = true
    this.setState({
      ...this.props.pizza,
      quantity: 1
    })
  }

  render() {
    const {pizza} = this.props
    return (
      <div>
        <Card style={{width: '18rem'}}>
          <Link to={`/${pizza.id}`}>
            <Card.Img variant="top" src={pizza.imageUrl} />
          </Link>
          <Card.Body>
            <Card.Title>{pizza.name}</Card.Title>
            <Card.Text>{pizza.description}</Card.Text>
            <Card.Text>{pizza.price}</Card.Text>
            <Button variant="danger" onClick={this.handleSubmit}>
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCart: pizza => dispatch(addCart(pizza))
  }
}

export default connect(null, mapDispatchToProps)(PizzaCard)
