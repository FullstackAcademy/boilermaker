import React from 'react'
import {connect} from 'react-redux'
import {fetchPizzas} from '../store/pizzas'
import PizzaCard from './PizzaCard'
import CarouselSlide from './Carousel'

// Notice that we're exporting the AllPizzas component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllPizzas extends React.Component {
  constructor(props) {
    super(props)

    this.loading = true
  }

  componentDidMount() {
    this.loading = false
    this.props.fetchPizzas()
  }
  componentDidUpdate(prevprops) {
    if (prevprops.pizzas !== this.props.pizzas) {
      console.log('we updated the component')
    }
  }
  render() {
    const pizzas = this.props.pizzas
    return this.loading ? (
      <img src="https://fullstackacademy.slack.com/files/U02CSK206LS/F034UU5EYAJ/image.png" />
    ) : (
      <div>
        <div className="carousel">
          <CarouselSlide pizzas={pizzas} />
        </div>
        <div className="allpizzas">
          {pizzas.map(pizza => {
            return <PizzaCard key={pizza.id} pizza={pizza} />
          })}
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

export default connect(mapState, mapDispatch)(AllPizzas)
