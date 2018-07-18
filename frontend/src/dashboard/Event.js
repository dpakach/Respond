import React, {Component} from 'react';

import Facts from './Facts';

export default class Event extends Component {
  render() {
    const {event} = this.props;
    return (
      <div class="list-item">
        <div class="list-item__title">{event.title}</div>

        <div class="list-item__content">{event.description}</div>

        <Facts {...this.props} />
      </div>
    );
  }
}
