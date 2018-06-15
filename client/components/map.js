
import React, { Component } from 'react';
// import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
// import child component
import MapContainer from './mapcontainer'
import courts from '../courts'
// import Marker from './marker'


const style = {
  width: '75%',
  height: '75%',
}

class HoopMap extends Component {
  render() {
    console.log(courts.features)
    return (
      <div>
        <h1> FIND A PICKUP GAME </h1>
        <Map google={this.props.google}
        style={style}
        initialCenter={{lat: 40.7485722, lng: -74.0068633}}
        zoom={12}>
        {
        courts.features.map(court => {
          return <Marker position={{lat: court.geometry.coordinates[1], lng: court.geometry.coordinates[0]}} icon={{
            url: "http://www.clker.com/cliparts/j/N/m/m/d/2/glossy-red-icon-button-md.png",
            anchor: new google.maps.Point(10,10),
            scaledSize: new google.maps.Size(10,10)
          }}/>
        })}
        </Map>
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBL6XBWAiP5STkl9nRcE8x3XTtywDqWDu4',
})(HoopMap)
