import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  withRouter,
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'
// import {Login, Signup, UserHome} from './components'
import {
  Login,
  Signup,
  AllPizzas,
  SinglePizza,
  Cart,
  UserHome
} from './components'
import {me} from './store'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  //DELETE ME!!! to confim cahnges
  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={UserHome} />
            {/* <Redirect to="/home" /> */}
            <Route path="/pizzas" component={AllPizzas} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/:id" component={SinglePizza} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>

      // <Switch>
      //   {/* Routes placed here are available to all visitors */}

      //   {isLoggedIn && (
      //     <Switch>
      //       {/* Routes placed here are only available after logging in */}
      //       <Route path="/home" component={UserHome} />
      //     </Switch>
      //   )}
      //   {/* Displays our Login component as a fallback */}
      //   <Route component={Login} />
      // </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

/* <Navbar.Brand href="/">Menu</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
            </Nav> */

// <Router>
//   <div>
//     {/* <nav>That's Amore!</nav> */}
//     <Navbar bg="success" variant="dark">
//       <Container>
//         <Navbar.Brand>
//           <Link to="/">
//             <span className="navLinkHeader">Thats Amore </span>
//           </Link>
//         </Navbar.Brand>
//         <Nav fill variant="tabs" defaultActiveKey="/home">
//           <Link className="navLink" to="/login">
//             Log In
//           </Link>
//           <Link className="navLink" to="/signup">
//             Sign up
//           </Link>
//           <Link className="navLink" to="/cart">
//             Cart
//           </Link>
//         </Nav>
//       </Container>
//     </Navbar>
//     <main>
//       {/* <h1>Pizzas For Sale</h1> */}
//       <Switch>
//         <Route exact path="/" component={AllPizzas} />
//         <Route exact path="/cart" component={Cart} />
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/signup" component={Signup} />
//         <Route exact path="/:id" component={SinglePizza} />
//       </Switch>
//     </main>
//   </div>
// </Router>
