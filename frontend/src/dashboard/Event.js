import React, { Component } from "react";
import { Link } from "react-router-dom";

import Facts from "./Facts";
import Events from "./Events";

export default class Event extends Component {
  render() {
    const { event } = this.props;
    const title = "lorem Ipsum";
    const description =
      "Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!";
    const facts = {
      casualties: 200,
      alerts: 2000,
      messages: 4000
    };
    if (event.facts === undefined) {
      event.facts = {
        casualties: 0,
        donation: 0,
        messages: 0
      };
    } else {
      if (event.facts.casualties === undefined) event.facts.casualties = 0;
      else if (event.facts.donation === undefined) event.facts.donation = 0;
      else if (event.facts.messages === undefined) event.facts.messages = 0;
    }

    return (
      <div>
        <Link to={`/events/${event.id}`}>
          <div className="list-item">
            <div className="list-item__title">{event.title}</div>

            <div className="list-item__content">{event.description}</div>

            <Facts facts={event.facts} />
          </div>
        </Link>
      </div>
    );
  }
}
