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
