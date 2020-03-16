const {Marker} = require('mapbox-gl')

const iconURLs = {
  hotels: 'http://i.imgur.com/D9574Cu.png',
  restaurants: 'http://i.imgur.com/cqR6pUI.png',
  activities: 'http://i.imgur.com/WbMOfMl.png',
  music: 'https://img.icons8.com/android/24/000000/music.png'
}

const buildMarker = (type, coords) => {
  if (!iconURLs.hasOwnProperty(type)) {
    type = 'activities'
  }
  const markerEl = document.createElement('div')
  markerEl.style.backgroundSize = 'contain'
  markerEl.style.width = '16px'
  markerEl.style.height = '18px'
  markerEl.style.backgroundImage = `url(${iconURLs[type]})`
  return new Marker(markerEl).setLngLat(coords)
}

module.exports = buildMarker
