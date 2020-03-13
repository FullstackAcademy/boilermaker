import React, {Component} from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'

const defaultState = {
  lng: 74.007,
  lat: 40.7209,
  zoom: 2
}

class MapGl extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  componentDidMount() {
    if (!this.props.mapboxToken) {
      console.log('hey no token!!')
      //this.fetchToken()
    } else {
      mapboxgl.accessToken = this.props.mapboxToken
      console.log('mapboxgl', mapboxgl)
    }

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    })
  }

  render() {
    return (
      <div>
        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    mapboxToken: state.authToken
  }
}

export default connect(mapState)(MapGl)
