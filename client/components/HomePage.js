import React from 'react'
import CarouselSlide from './Carousel'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchPizzas} from '../store/pizzas'


class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.loading = true
  }
  componentDidMount() {
    this.loading = false
    this.props.fetchPizzas()
  }
render(){
  const pizzas = this.props.pizzas
  return (
    <div>
      <div>
       <CarouselSlide pizzas={pizzas} />
      <div className="hometext">
        <h3 className="homeheader">Pizza is not just food</h3>
        <h5>
          Welcome to Its Amore! where we believe in the power of pizza.
          For many, pizza is not just food but a way of life. 
          ... more description
          ... more description
          .. more description
          
        </h5>
      </div>
        <div className="icon">
          <Link to="/pizzas">
          <div className="pizza-container">
            <div className="pizza">
              <div className="basil">
                <div className="leaf"></div>
                </div>
                <div className="onions"></div>
                <div className="olives"></div>
                <div className="pepperonis"></div>
                <div className="slices">
                <div className="slice slice-1"></div>
                <div className="slice slice-2"></div>
                <div className="slice slice-3"></div>
                <div className="slice slice-4"></div>
              </div>
            </div>
          </div>
          </Link>
        </div>
        </div>
      
    </div>
  )
  }
}
const mapState = state => {
  return {
    pizzas: state.pizzas
  }
}

const mapDispatch = dispatch => {
  return {
    fetchPizzas: () => dispatch(fetchPizzas())
  }
}

export default connect(mapState, mapDispatch)(HomePage)



















// export const HomePage = () => {
//   return (
//     <div>
//       <div>
//         <h3>Pizza is not just food its a way of life</h3>
//         <h4>
//           Welcome to Its Amore! where we believe in the power of pizza.
//           For many, pizza is not just food but a way of life. 
//           ... more description
//           ... more description
//           .. more description
//         </h4>
        
//       </div>
//       <CarouselSlide />
//       <div>
//          <button type="button" onClick={} >Current Vendors</button>
//       </div>
//     </div>
   
//   )
// }

// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(HomePage)

// HomePage.propTypes = {
//   email: PropTypes.string
// }


// Welcome to Its Amore! where we believe in the power of pizza.
//           For many, pizza is not just food but a way of life. While many 
//           who join are resturants 
          
//           Here at 
//           It's Amore! our goal is to not only provide thi