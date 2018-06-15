import React, { Component } from 'react';
import courts from '../courts';

class Marker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.courts.features.map(court => {
          positions={{lat: court.geometry.coordinates[0], lng: court.geometry.coordinates[1]}}
        })}
      </div>
    )
  }
}

export default Marker
