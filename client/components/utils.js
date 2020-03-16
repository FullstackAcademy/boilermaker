import {locationOptions, defaultFilters} from './defaults'
import {Marker} from '../components'

export const parseLLZ = dataLLZ => {
  const [lat, lng, zoom] = dataLLZ.split(';').map(s => +s)
  return {lat, lng, zoom}
}

export const mapStateChanged = (map, mapState) => {
  return (
    +map.getCenter().lng.toFixed(4) !== mapState.lng ||
    +map.getCenter().lat.toFixed(4) !== mapState.lat ||
    +map.getZoom().toFixed(2) !== mapState.zoom
  )
}

export const locationToMapState = location => {
  const {lat, lng, zoom} = parseLLZ(locationOptions[location])
  return {
    location,
    lat,
    lng,
    zoom
  }
}

export const filtersToMapState = (
  locationMapState,
  filters = defaultFilters
) => {
  return {...locationMapState, filters}
}

export const getBoundsFromMap = map => {
  var bounds = map.getBounds()
  console.log('bounds', bounds, 'sw', bounds.getSouthWest())
  var sw = bounds.getSouthWest()
  var ne = bounds.getNorthEast()

  return {
    minLat: sw.lat.toFixed(4),
    maxLat: ne.lat.toFixed(4),
    minLng: sw.lng.toFixed(4),
    maxLng: ne.lng.toFixed(4)
  }
}

export const getBoundedEvents = (events, bounds) => {
  const boundedEvents = events.filter(
    event =>
      event.place.longitude >= bounds.minLng &&
      event.place.longitude <= bounds.maxLng &&
      event.place.latitude >= bounds.minLat &&
      event.place.latitude <= bounds.maxLat
  )
  return boundedEvents
}

export const getMarkersFromEvents = events => {
  const eventMarkers = events.map(event =>
    Marker('music', [event.place.longitude, event.place.latitude])
  )
  console.log('markers from events', eventMarkers)
  return eventMarkers
}
