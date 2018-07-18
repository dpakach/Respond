import React, {Component} from 'react';

import Facts from './Facts';

export default class Event extends Component {
  render() {
    const {event} = this.props;
    return (
      <div className="list-item">
        <div className="list-item__title">{event.title}</div>

        <div className="list-item__content">{event.description}</div>

        <Facts {...this.props} />
      </div>
    );
  }
}
