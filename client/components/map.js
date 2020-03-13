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
    if (!this.props.isAuthorized) {
      console.log('we are going to fetch the token')
      this.props.fetchToken()
    } else {
      mapboxgl.accessToken = this.props.mapboxToken

      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.state.lng, this.state.lat],
        zoom: this.state.zoom
      })

      map.on('move', () => {
        this.setState({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        })
      })
    }
  }

  render() {
    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{' '}
            {this.state.zoom}
          </div>
        </div>
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
    isAuthorized: !!state.authToken,
    mapboxToken: state.authToken
  }
}

export default connect(mapState)(MapGl)
