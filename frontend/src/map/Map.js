import React from "react";
import ReactDOM from "react-dom";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps";
import { withRouter } from "react-router-dom";

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
    containerElement: <div style={{ height: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />,
    defaultStyles: style
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      // console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      // console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={props.zoom}
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
        key={marker.id}
        position={{
          lat: marker.location.latitude,
          lng: marker.location.longitude
        }}
        onClick={() => {
          console.log("props: ", props, marker);
          props.history.push(`/events/${marker.id}`);
        }}
      />
    ))}
  </GoogleMap>
));

let MapWithMarkersRouted = withRouter(MapWithMarkers);

export default class Map extends React.PureComponent {
  state = {
    position: {
      lat: 28.2538926,
      lng: 83.97422173
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
    incidents
      .fetch_verified_only()
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ markers: data });
      });
  }

  render() {
    return (
      <MapWithMarkersRouted
        className="dashboard__back"
        defaultStyles={style}
        markers={this.state.markers}
        position={this.state.position}
        zoom={11}
      />
    );
  }
}

export class MapStatic extends React.PureComponent {
  state = {
    position: {
      lat: 28.2538926,
      lng: 83.97422173
    }
  };

  render() {
    return (
      <MapWithMarkersRouted
        className="dashboard__back"
        defaultStyles={style}
        markers={[this.props.marker]}
        position={this.props.position}
        zoom={12}
      />
    );
  }
}
