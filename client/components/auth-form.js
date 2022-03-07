import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Card>
      <div className="formContainer">
        <Form onSubmit={handleSubmit} name={name || ''} className="container">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </Form>
      </div>
    </Card>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

// import React from 'react'
// import {connect} from 'react-redux'
// import {authenticate} from '../store'

// /**
//  * COMPONENT
//  */
// const AuthForm = props => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name || ''}>
//         <div>
//           <label htmlFor="email">
//             <small>Email</small>
//           </label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//       <a href="/auth/google">{displayName} with Google</a>
//     </div>
//   );
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(authenticate(email, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)




  // {name === 'signup' ?
  //           <Form.Group className="mb-3" controlId="name">
  //             <Form.Label>Name</Form.Label>
  //             <Form.Control name="name" type="text" placeholder="Enter Name" />
  //             <Form.Control name="lastName" type="text" placeholder="Enter last name" />
  //           </Form.Group>
  //           :
  //           null
  //         } 