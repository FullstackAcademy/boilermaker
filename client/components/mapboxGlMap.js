import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {styled} from '@material-ui/styles'
import SimpleMenu from './simple-menu'
import FilterListIcon from '@material-ui/icons/FilterListRounded'
import LocationCityIcon from '@material-ui/icons/LocationCityRounded'
import {parseLLZ, locationToMapState} from './utils'
import {filterOptions, locationOptions, defaultLocation} from './defaults'

import {fetchEvents} from '../store'

const MyLocationCityIcon = styled(LocationCityIcon)({
  color: 'black'
})

const MapboxGLMap = ({isAuthorized, mapboxToken, fetchToken}) => {
  const [map, setMap] = useState(null)
  const [location, setLocation] = useState(defaultLocation)
  const [mapState, setMapState] = useState(locationToMapState(defaultLocation))
  const mapContainer = useRef(null)

  useEffect(() => {
    // this runs after any render (mount, or update)
    if (!isAuthorized) {
      console.log('we are going to fetch the token')
      fetchToken()
    } else {
      mapboxgl.accessToken = mapboxToken
    }

    const initializeMap = ({setMap, mapContainer}) => {
      const locationMapState = locationToMapState(location)

      console.log('location map state', locationMapState)

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [locationMapState.lng, locationMapState.lat],
        zoom: locationMapState.zoom
      })

      map.on('move', () => {
        setMapState(locationMapState)
      })

      map.on('load', () => {
        setMap(map)
        // map.resize()
      })
    }

    console.log(
      'use effect is running outside initialization with map',
      map,
      'location',
      location
    )

    if (!map) {
      initializeMap({setMap, mapContainer})
    } else if (map && location !== mapState.location) {
      const newMapState = locationToMapState(location)
      setMapState(newMapState) // update state to point to new locatin
      initializeMap({setMap, mapContainer}) // update map for new location
    }
  }, [map, location])

  function handleFilterList(key) {
    console.log('received key', key)
  }

  function handleCity(key) {
    console.log('inside of handleCity we received key', key)

    setLocation(key)
  }

  return (
    <div>
      <div className="sidebarContainer">
        Longitude: {mapState.lng} | Latitude: {mapState.lat} | Zoom:{' '}
        {mapState.zoom}
      </div>
      <div className="mapboxContainer">
        <div className="optionsContainer">
          <div className="filterContainer">
            <SimpleMenu
              icon={FilterListIcon}
              options={filterOptions}
              handleFilter={handleFilterList}
            />
          </div>
          <div className="filterContainer">
            <SimpleMenu
              icon={MyLocationCityIcon}
              options={Object.keys(locationOptions)}
              handleFilter={handleCity}
            />
          </div>
        </div>
        <div ref={el => (mapContainer.current = el)} className="mapContainer" />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthorized: !!state.authToken,
    mapboxToken: state.authToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents() {
      dispatch(fetchEvents())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapboxGLMap)
