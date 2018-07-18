import React from "react";
import ReactDOM from "react-dom";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";
import style from "./styles";
import config from "../config";

import { getLocation } from "../Location";
import { incidents } from "../Database";

const { compose, withProps, withHandlers } = require("recompose");

const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithMarkers = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      config.apiKey
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `60vh` }} />,
    defaultStyles: style
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={3}
    defaultStyles={style}
    defaultOptions={{
      styles: style,
      disableDefaultUI: true
    }}
    defaultClickableIcons={false}
    defaultCenter={props.position}
    center={props.position}
  >
    {props.markers.map((marker, id) => (
      <Marker
        key={id}
        position={{
          lat: marker.location.latitude,
          lng: marker.location.longitude
        }}
        onClick={() => console.log(marker)}
      />
    ))}
  </GoogleMap>
));

export default class Map extends React.PureComponent {
  state = {
    position: {
      lat: 23,
      lng: 83
    }
  };

  refreshMarkers = data => this.setState({ markers: data });

  componentWillMount() {
    this.setState({ markers: [] });
    incidents.syncSubscribe(this.refreshMarkers);
  }

  componentWillUnmount() {
    incidents.unsubscribe(this.refreshMarkers);
  }

  setPosition = position => {
    this.setState({
      position: {
        lng: parseFloat(position.coords.longitude),
        lat: parseFloat(position.coords.latitude)
      }
    });
  };

  componentDidMount() {
    getLocation(this.setPosition);
    console.log(
      "incidents: ",
      incidents
        .fetch_verified_only()
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            data.push(doc.data());
          });
          this.setState({ markers: data });
        })
    );
  }

  render() {
    return (
      <MapWithMarkers
        defaultStyles={style}
        markers={this.state.markers}
        position={this.state.position}
      />
    );
  }
}
