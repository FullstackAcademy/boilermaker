import React, { Component } from 'react';
// import './App.css';
// import the Google Maps API Wrapper from google-maps-react
import { Map, InfoWindow, GoogleApiWrapper, Marker} from 'google-maps-react'
import {Link} from "react-router-dom"
// import child component
import MapContainer from './mapcontainer'
import courts from '../courts'
import axios from 'axios'
import CourtPage from './courtPage'
import { withRouter } from "react-router-dom";


const style = {
  width: '75%',
  height: '75%',
}

class HeatMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      showCourtInfo: false,
      activeMarker: {},
      courtInfo: {},
      activePlayers: 0,
      activeCourts: []
    }
    this.onMapClicked = this.onMapClicked.bind(this)
    this.onInfoClick = this.onInfoClick.bind(this)
  }


  async componentDidMount() {
    const res = await axios.get(`/api/courts/`)
    const activeCourts = res.data.filter(court => {
      if (court.users.length) {
        return court
      }

    })
    console.log(activeCourts)
    this.setState({
      activeCourts: activeCourts
    })
  }


  onMarkerClick = async (props, marker, event) => {
    const res = await axios.get(`/api/courts/${props.courtId}`)
    console.log(res.data)

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      showCourtInfo: true,
      courtInfo: res.data,
      activePlayers: res.data.users.length
    });
  }

  onInfoClick = () => {
    this.props.history.push(`/courts/${this.state.courtInfo.id}`);
    console.log("Hello")
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        showCourtInfo: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div>
        <h1>HEAT MAP</h1>
        {this.state.showingInfoWindow&&this.state.showCourtInfo?<button onClick={this.onInfoClick}>Court Info</button>:null}
        <Map google={this.props.google}
        style={style}
        onClick={this.onMapClicked}
        initialCenter={{lat: 40.7485722, lng: -74.0068633}}
        zoom={12}>
        {
        this.state.activeCourts.map((court) => {
          return <Marker position={{lat: Number(court.latitude), lng: Number(court.longitude)}} icon={{
            url: "http://www.clker.com/cliparts/g/p/S/V/L/0/fire-ball-icon-hi.png",
            anchor: new google.maps.Point(10,10),
            scaledSize: new google.maps.Size(15,15)
          }} onClick={this.onMarkerClick} courtId={court.id} />
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.courtInfo.name}</h1>
              <h3>{this.state.courtInfo.location}</h3>
              <h3>Current Players: {this.state.activePlayers}</h3>
            </div>
        </InfoWindow>
        </Map>
      </div>
    );
  }
}
// OTHER MOST IMPORTANT: Here we are exporting the App component WITH the GoogleApiWrapper. You pass it down with an object containing your API key
export default withRouter(GoogleApiWrapper({
  apiKey: 'AIzaSyBL6XBWAiP5STkl9nRcE8x3XTtywDqWDu4',
})(HeatMap))

