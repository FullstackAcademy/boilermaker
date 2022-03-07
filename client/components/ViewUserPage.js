import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch} from 'react-redux'
// import CarouselSlide from './Carousel'
// import { fetchPizzas } from '../store/pizzas'
import EditUserPage from './EditUserPage'
import OrderHistory from './OrderHistory'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import AdminPage from './AdminPage'
import {getCart} from '../store/cart'
import axios from 'axios'

import {Link} from 'react-router-dom'

export const UserHome = props => {
  const { email, isAdmin } = props
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false)
  console.log('admin test', props)
  useEffect(() => {
    async function loadCart() {
      try {
        const { data: cart } = await axios.get(`/api/orderItems/cart?userId=${props.user.id}`);
        dispatch(getCart(cart));
      } catch (error) {
        console.error("Failed to retrieve the user's cart", error);
      }
    }
    loadCart();
  }, [])
  return ( isAdmin ? (
    <AdminPage />
  ) : (
    <div>
      <Card className="text-center" style ={{}}>
        <Card.Body>
          <Card.Title>Welcome, </Card.Title>
          <Card.Text>
            your email is {email}
          </Card.Text>
          <Button type='button' variant="primary">Check Your History</Button>
          <Button onClick={()=>setOpenEdit(!openEdit)}>Click me to edit this user</Button>
        </Card.Body>
          {openEdit === true ? <EditUserPage /> : null}
          {/* <OrderHistory /> */}
      </Card>
    </div>
  )
  )
}

const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: (userId) => dispatch(getCart(userId))
  }
}

export default connect(mapState,mapDispatch)(UserHome)

UserHome.propTypes = {
  // firstName: PropTypes.string,
  email: PropTypes.string,
  user: PropTypes.object
}
