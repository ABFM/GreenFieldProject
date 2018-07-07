import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
export class MapContainer extends React.Component {
  constructor (props) {
    super(props);
        this.state = {
      lat: 0,
      lng: 0
    };
    }

  onClick (obj) {
    console.log(obj);
        this.props.click(obj);
        this.setState({
      lat: obj.latLng.lat(),
      lng: obj.latLng.lng()
    });
    }

  render () {
    return (

      <Map onClick={this.onClick.bind(this)} google={this.props.google} style={{width: '100%', height: '50%'
      }} zoom={12} initialCenter={{
        lat: 31.934885,
        lng: 35.881807

      }} >

        <Marker position={{lat: this.state.lat, lng: this.state.lng}} />

      </Map>

    );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDWDPQOGfp6omxkvZllmc4pWTS0ye5-bwg'
})(MapContainer);
