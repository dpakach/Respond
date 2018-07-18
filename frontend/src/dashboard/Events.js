import React, {Component} from 'react';

import Event from './Event';
import {getLocation} from '../Location';
import {incidents} from '../Database';

export default class Events extends Component {
  events = [
    {
    },
  ];

  state = {
    position: null,
  };

  refreshEvents = data => this.setState({events: data});

  componentWillMount() {
    this.setState({events: []});
    incidents.syncSubscribe(this.refreshEvents);
  }

  componentDidMount() {
    getLocation(position =>
      this.setState({
        position: {
          lng: parseFloat(position.coords.longitude),
          lat: parseFloat(position.coords.latitude),
        },
      }),
    );
    incidents
      .fetch_verified_only()
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        this.setState({events: data});
      });
  }

  render() {
    console.log(this.state.events);
    return (
      <div className="list">
        {this.state.events.map(event => <Event key={event.id} event={event} />)}
      </div>
    );
  }
}
