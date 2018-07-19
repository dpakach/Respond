import React, { Component } from "react";

import EventActions from "./EventActions";
import { MapStatic } from "../map/Map";
import Facts from "../dashboard/Facts";
import Event from "../dashboard/Event";
import { incidents } from "../Database";

export default class EventDetail extends Component {
  state = {
    eventData: {
      title: "",
      description: "",

      location: { lat: 28.2238976, lng: 83.9753728 }
    }
  };
  getEventDetails = () =>
    incidents.collection
      .doc(window.location.pathname.split("/")[2])
      .get()
      .then(doc => {
        console.log(doc, doc.data());
        this.setState({ eventData: doc.data() });
      });

  componentDidMount() {
    this.getEventDetails();
  }

  render() {
    return (
      <div className="detail">
        <div className="detail__head">
          <MapStatic
            marker={this.state.eventData}
            position={this.state.eventData.location}
          />

          <div className="card detail__card">
            <Event event={this.state.eventData} />
            <EventActions {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
