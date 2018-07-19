import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Facts from './Facts';

export default class Event extends Component {
  render() {
    const {event} = this.props;
    const title= 'lorem Ipsum';
    const description= 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!';
    const facts = {
    casualties: 200,
    alerts: 2000,
    messages: 4000,
}

    return (
      <div>
          <Link to={`/events/${event.id}`}>
            <div className="list-item">
              <div className="list-item__title">{title}</div>

              <div className="list-item__content">{description}</div>

              <Facts facts={facts} />
            </div>
          </Link>
      </div>
    );
  }
}
