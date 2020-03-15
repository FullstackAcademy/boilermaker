import React, {useEffect, useRef, useState} from 'react'
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

const MapboxGlMap = ({isAuthorized, mapboxToken, fetchToken}) => {
  const [map, setMap] = useState(null) // default state for map, ability to update
  const mapContainer = useRef(null) // default DOM element for mapContainer
  const [mapState, setMapState] = useState(defaultMapState) // keep track of llz

  useEffect(() => {
    // similar to component did mount
    const initializeMap = ({setMap, mapContainer}) => {
      if (!isAuthorized) {
        console.log('we are going to fetch the token')
        fetchToken()
      } else {
        mapboxgl.accessToken = mapboxToken
      }
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [0, 0],
        zoom: 5
      })

      map.on('move', () => {
        setMapState({
          key: mapState.key,
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        })
      })

      map.on('load', () => {
        setMap(map) // update state to be current map
        map.resize()
      })
    }

    if (!map) {
      initializeMap(setMap, mapContainer)
    } else {
      console.log('mapState is', mapState)
    } // if no map initialize it
  }, [map, mapState]) // only run this effect when map has changed

  function handleCity(cityKey) {
    console.log('inside of handleCity we received key', key)

    const {lat, lng, z} = parseLLZ(cityOptions[key])

    console.log('set map to', lat, lng, z)

    setMapState({cityKey, lat, lng, z}) // update lat, lon, z

    // get & SET new map
  }

  function handleFilterList(key) {
    console.log('received key', key)
  }

  return (
    <div>
      <div className="sidebarContainer">
        Longitude: {lng} | Latitude: {lat} | Zoom: {z}
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
              color="secondary"
              options={Object.keys(cityOptions)}
              handleFilter={handleCity}
            />
          </div>
        </div>
        <div ref={el => (mapContainer.current = el)} className="mapContainer" />
      </div>
    </div>
  )
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

export default MapboxGlMap
//export default connect(mapState)(MapboxGlMap)
