import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {styled} from '@material-ui/styles'
import SimpleMenu from './simple-menu'
import FilterListIcon from '@material-ui/icons/FilterListRounded'
import LocationCityIcon from '@material-ui/icons/LocationCityRounded'
import {
  parseLLZ,
  locationToMapState,
  filtersToMapState,
  getBoundsFromMap,
  getBoundedEvents,
  getMarkersFromEvents
} from './utils'
import {
  filterOptions,
  locationOptions,
  defaultLocation,
  defaultFilters,
  defaultBounds
} from './defaults'

import {fetchEvents} from '../store'

const MyLocationCityIcon = styled(LocationCityIcon)({
  color: 'black'
})

const MapboxGLMap = ({
  isAuthorized,
  mapboxToken,
  fetchToken,
  fetchEvents,
  events
}) => {
  const [map, setMap] = useState(null)
  const [location, setLocation] = useState(defaultLocation)
  const [filters, setFilters] = useState(defaultFilters)
  const [mapState, setMapState] = useState(
    filtersToMapState(locationToMapState(defaultLocation))
  )
  const [mapBounds, setMapBounds] = useState(defaultBounds)
  const mapContainer = useRef(null)

  useEffect(() => {
    // this runs after any render (mount, or update)
    if (!isAuthorized) {
      console.log('we are going to fetch the token')
      fetchToken()
    } else {
      mapboxgl.accessToken = mapboxToken
    }

    const initializeMap = ({setMap, mapContainer, events}) => {
      const locationMapState = locationToMapState(location)
      const filtersMapState = filtersToMapState(locationMapState, filters)

      console.log('map state is', mapState)
      console.log('location map state', locationMapState)
      console.log('filters map state', filtersMapState)
      console.log('use effect inside init has events', events)

      console.log('filters in effect are', mapState.filters)

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [locationMapState.lng, locationMapState.lat],
        zoom: locationMapState.zoom
      })

      map.on('move', () => {
        setMapState(filtersMapState)
        const bounds = getBoundsFromMap
        setMapBounds(getBoundsFromMap(map))

        const boundedEvents = getBoundedEvents(events, bounds)
        if (boundedEvents.length) {
          const markers = getMarkersFromEvents(boundedEvents)
          markers.forEach(marker => marker.addTo(map))
        }
      })

      map.on('load', () => {
        setMap(map)
        const bounds = getBoundsFromMap(map)
        setMapBounds(getBoundsFromMap(map))

        // render all markers on load
        if (events.length) {
          const markers = getMarkersFromEvents(events)
          markers.forEach(marker => marker.addTo(map))
        }
      })
    }

    console.log('use effect outside init has location', location)

    if (!map) {
      initializeMap({setMap, mapContainer, events})
    } else if (map && location !== mapState.location) {
      const newMapState = filtersToMapState(locationToMapState(location))
      setMapState(newMapState) // update state to point to new locatin
      initializeMap({setMap, mapContainer, events}) // update map for new location
    } else if (map && filters !== mapState.filters) {
      console.log('filters are', filters)
      console.log('map state is', mapState)
      const newMapState = filtersToMapState(mapState, filters)
      setMapState(newMapState)

      //initializeMap({setMap, mapContainer, events})
    }

    // load events
  }, [map, location, filters])

  function handleFilterList(key) {
    console.log('received filter key', key)

    setFilters(prevState => {
      return {...prevState, filters: prevState.filters.push[key]}
    })
  }

  function handleCity(key) {
    console.log('inside of handleCity we received key', key)

    setLocation(key)
  }

  console.log('bounded events are ', getBoundedEvents(events, mapBounds))
  return (
    <div>
      <div className="sidebarContainer">
        Longitude: {mapState.lng} | Latitude: {mapState.lat} | Zoom:
        {mapState.zoom} | Event Count:
        {getBoundedEvents(events, mapBounds).length}
      </div>
      <div className="mapboxContainer">
        <div className="optionsContainer">
          <div className="filterContainer">
            <SimpleMenu
              icon={FilterListIcon}
              options={Object.keys(filterOptions)}
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
    mapboxToken: state.authToken,
    events: state.events,
    markers: state.markers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents(minLat, maxLat, minLng, maxLng) {
      dispatch(fetchEvents(minLat, maxLat, minLng, maxLng))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MapboxGLMap)
