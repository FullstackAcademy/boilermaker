import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import {Link, useHistory} from 'react-router-dom'
// import { useHistory } from 'react-router';

const CarouselSlide = props => {
  const {pizzas} = props
  return (
    <div>
      <Carousel fade controls={false}>
        {pizzas.map(pizza => {
          return (
            <Carousel.Item
              interval={2000}
              className="carosuelImage"
              onPause={() => 'hover'}
              key={pizza.id}
            >
              <img className="carouselslide" src={pizza.imageUrl} />

              {/* <Carousel.Caption className="carouselcontent">
                <h3>{pizza.name}</h3>
                <p>{pizza.description}</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default CarouselSlide
