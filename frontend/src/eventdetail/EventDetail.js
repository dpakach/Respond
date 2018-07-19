import React, {Component} from 'react';

import EventActions from './EventActions';
import Map from '../map/Map';
import Facts from '../dashboard/Facts';
import Event from '../dashboard/Event';

export default class EventDetail extends Component {
  render() {
    return (
      <div className="detail">
        <div className="detail__head">
          <Map />

          <div className="card detail__card">
              <Event event= {{id: 1}}/>
              <EventActions />
          </div>
        </div>
      </div>
    );
  }
}
