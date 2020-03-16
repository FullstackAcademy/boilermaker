import {locationOptions} from './defaults'

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
