import React, {useState, useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import {fetchPizzas} from '../store/pizzas'
import {connect, useDispatch, useSelector} from 'react-redux'

export class CarouselSlide extends React.Component {
  constructor(props) {
    super(props)

    this.loading = true
  }
  componentDidMount() {
    this.loading = false
    this.props.fetchPizzas()
  }
  render() {
    const pizzas = this.props.pizzas
    return (
      <div className="carousel">
        <Carousel fade controls={false}>
          {pizzas.map(pizza => {
            return (
              <Carousel.Item
                interval={1000}
                className="carosuelImage"
                key={pizza.id}
              >
                <img className="carouselslide" src={pizza.imageUrl} />
              </Carousel.Item>
            )
          })}
        </Carousel>
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

export default connect(mapState, mapDispatch)(CarouselSlide)

// changed
// import React, {useState, useEffect } from 'react'
// import Carousel from 'react-bootstrap/Carousel'
// import {Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import {fetchPizzas} from '../store/pizzas'

// // import { useHistory } from 'react-router';

// const CarouselSlide = props => {
//   const {pizzas} = props
//   return (
//     <div>
//       <Carousel fade controls={false}>
//         {pizzas.map(pizza => {
//           return (
//             <Carousel.Item
//               interval={2000}
//               className="carosuelImage"
//               onPause={() => 'hover'}
//               key={pizza.id}
//             >
//               <img className="carouselslide" src={pizza.imageUrl} />

//               {/* <Carousel.Caption className="carouselcontent">
//                 <h3>{pizza.name}</h3>
//                 <p>{pizza.description}</p>
//               </Carousel.Caption> */}
//             </Carousel.Item>
//           )
//         })}
//       </Carousel>
//     </div>
//   )
// }

// export default CarouselSlide
