import React, {Component} from 'react';

import EventActions from './EventActions';
import Map from '../map/Map';
import Facts from '../dashboard/Facts';

export default class EventDetail extends Component {
  render() {
    return (
      <div className="detail">
        <div className="detail__head">
          <Map />

          <div className="card detail__card">
            <div className="list-item">
              <div className="list-item__title">lorem</div>
              <div className="list-item__content">
                Sit nisi eveniet ipsum quaerat repellendus. Facilis consectetur
                exercitationem aperiam impedit minus Tempora adipisci doloremque
                praesentium in laudantium.
              </div>

            </div>
              <EventActions />
          </div>
        </div>
      </div>
    );
  }
}
