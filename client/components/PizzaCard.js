import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {addCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      Added pizza to the shopping cart!
    </Popover.Body>
  </Popover>
);
class PizzaCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pizza: {...this.props.pizza, quantity: 1 },
      showOverlay: false
    }
    this.inCart = false
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(event) {
    event.preventDefault()
    this.props.addCart(this.state.pizza)
    this.inCart = true
    this.setState({pizza: {...this.props.pizza, quantity: 1 }, showOverlay: true});
    setTimeout(() => {
      this.setState({showOverlay: false})
    }, 5000);
  }
  render() {
    const {pizza} = this.props
    const {isLoggedIn} = this.props
    console.log('logged', isLoggedIn)
    return (
      <div className='pizzacard'>
        <Card style={{width: '20rem'}}>
          <Link to={`/${pizza.id}`}>
            <Card.Img variant="top" src={pizza.imageUrl} className='my-image'/>
          </Link>
          <Card.Body>
            <Card.Title>{pizza.name}</Card.Title>
            <Card.Text className='cardtext'>{pizza.description}</Card.Text>
            <Card.Text>{pizza.price}</Card.Text>
            {isLoggedIn ? (
              <OverlayTrigger trigger="click" placement="bottom" overlay={this.state.showOverlay ? popover : <div />} >
              <Button variant="danger" onClick={this.handleSubmit}>
                Add to Cart
              </Button>
            </OverlayTrigger >
            ) : <Button variant="danger" type='button'>
              Add to wishlist
              </Button> }
          </Card.Body>
        </Card>
      </div>
    )
  }
}
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addCart: pizza => dispatch(addCart(pizza))

  }
}

export default connect(mapState, mapDispatchToProps)(PizzaCard)

PizzaCard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}


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
