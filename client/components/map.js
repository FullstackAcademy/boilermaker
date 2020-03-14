import React, {Component} from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {styled} from '@material-ui/styles'
import FilterListIcon from '@material-ui/icons/FilterListRounded'
import LocationCityIcon from '@material-ui/icons/LocationCityRounded'

import {defaultMapState, filterOptions, cityOptions} from './defaults'
import {parseLLZ} from './utils'
import SimpleMenu from './simple-menu'

const MyLocationCityIcon = styled(LocationCityIcon)({
  color: '#B9B7B7'
})

class MapGl extends Component {
  constructor(props) {
    super(props)
    this.state = defaultMapState
    this.renderMap = this.renderMap.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleFilterList = this.handleFilterList.bind(this)
    this.map = null
  }

  newMap() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    })

    this.map.on('move', () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      })
    })
  }

  handleCity(key) {
    console.log('inside of handleCity we received key', key)

    const {lat, lng, z} = parseLLZ(cityOptions[key])
    console.log('set map to', lat, lng, z)

    this.setState({
      lng: lng,
      lat: lat,
      zoom: z
    })

    this.newMap()
  }

  handleFilterList() {}

  renderMap() {}

  componentDidMount() {
    if (!this.props.isAuthorized) {
      console.log('we are going to fetch the token')
      this.props.fetchToken()
    } else {
      mapboxgl.accessToken = this.props.mapboxToken
    }

    newMap()
  }

  render() {
    return (
      <div>
        <div className="sidebarContainer">
          Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{' '}
          {this.state.zoom}
        </div>
        <div className="mapboxContainer">
          <div className="optionsContainer">
            <div className="filterContainer">
              <SimpleMenu
                icon={FilterListIcon}
                options={filterOptions}
                handleFilter={this.handleFilterList}
              />
            </div>
            <div className="filterContainer">
              <SimpleMenu
                icon={MyLocationCityIcon}
                color="secondary"
                options={Object.keys(cityOptions)}
                handleFilter={this.handleCity}
              />
            </div>
          </div>
          <div
            ref={el => (this.mapContainer = el)}
            className="mapContainer"
          ></div>
        </div>
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
