import React, {useState, useEffect} from 'react'
import PizzaCard from './PizzaCard'
import FilterPizzas from './FilterPizzas'
import axios from 'axios'



const AllPizzas = () => {
  // const [loading, setLoading] = useState(true)
  const [pizzas, setPizzas] = useState([])
  const [typeFilter, setTypeFilter] = useState('')

  useEffect(() => {
    async function getPizzas() {
      try {
        const res = await axios.get('/api/pizzas')
        const info = res.data
        setPizzas(info)
      } catch (error) {
        console.log('there was a problem')
      }
    }
    getPizzas()
  }, [])
  
  const pizzaCities = Array.from(new Set(pizzas.map((el) => {
    return el.cityOfPizza
  })))

  const pizzasToShow = pizzas.filter((pizza) => {
    if(typeFilter && typeFilter !== 'All') {
      return pizza.cityOfPizza === typeFilter
    }
    return true
  })

  return (
      <div>
        <FilterPizzas pizzaCities={pizzaCities} setSelected={setTypeFilter} />
        <div className="allpizzas">
          {pizzasToShow.map(pizza => {
            return <PizzaCard key={pizza.id} pizza={pizza} />
          })}
        </div>
      </div>
  )
}

 export default AllPizzas



// import React, {useState, useEffect} from 'react'
// import {connect, useDispatch, useSelector } from 'react-redux'
// import {fetchPizzas} from '../store/pizzas'
// import PizzaCard from './PizzaCard'
// import FilterPizzas from './FilterPizzas'


 // Notice that we're exporting the AllPizzas component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
//useDispatch, useSelector


// export class AllPizzas extends React.Component {
//   constructor(props) {
//     super(props)
    
//     this.loading = true;

//   }
  

//   componentDidMount() {
    
//     this.loading = false
//     this.props.fetchPizzas()
//   }
//   componentDidUpdate(prevprops) {
//     if (prevprops.pizzas !== this.props.pizzas) {
//       console.log('updated AllPizzas');
//     }
//   }
//   render() {
    
//     const pizzas = this.props.pizzas
//     const pizzaCities = Array.from(new Set(pizzas.map((el) => {
//       return el.cityOfPizza
//     })))
    
    
    
//     return this.loading ? (
//       <img src="https://fullstackacademy.slack.com/files/U02CSK206LS/F034UU5EYAJ/image.png" />
//     ) : (
//       <div>
//         <FilterPizzas pizzaCities={pizzaCities} />
//         <div className="allpizzas">
//           {pizzas.map(pizza => {
//             return <PizzaCard key={pizza.id} pizza={pizza} />
//           })}
//         </div>
//       </div>
//     )
//   }
// }

// const mapState = state => {
//   return {
//     pizzas: state.pizzas
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     fetchPizzas: () => dispatch(fetchPizzas())
//   }
// }

// export default connect(mapState, mapDispatch)(AllPizzas)
