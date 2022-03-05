import React, {useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'


const CarouselSlide = props => {
  const {pizzas} = props
   const history = useHistory()
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

export default CarouselSlide






