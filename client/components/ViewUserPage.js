import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import CarouselSlide from './Carousel'
// import { fetchPizzas } from '../store/pizzas'
import EditUserPage from './EditUserPage'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import AdminPage from './AdminPage'

import {Link} from 'react-router-dom'

export const UserHome = props => {
  const { email, isAdmin } = props

  const [openEdit, setOpenEdit] = useState(false)
  console.log('admin test', props)
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
        { openEdit === true ? <EditUserPage /> : null }
      </Card>
    </div>
  )
  )
}

const mapState = state => {
  return {
    email: state.auth.email,
    isAdmin: state.auth.isAdmin
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  // firstName: PropTypes.string,
  email: PropTypes.string
}
