import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class EventActions extends Component {
  render() {
    return (
      <div className="card detail__card">
        <div className="card__body">
          <ul className="card__icons">
            <a href="#">
              <li>
                <i className="material-icons card__icon card__icon--1">
                  attach_money
                </i>
                <p>lorem</p>
              </li>
            </a>
            <Link to={`/events/${this.props.match.params.id}/channel`}>
              <li>
                <i className="material-icons card__icon card__icon--2">
                  message
                </i>
                <p>lorem</p>
              </li>
            </Link>
            <a href="#">
              <li>
                <i className="material-icons card__icon card__icon--3">
                  touch_app
                </i>
                <p>I wanna help</p>
              </li>
            </a>
            <a href="#">
              <li>
                <i className="material-icons card__icon card__icon--4">share</i>
                <p>I wanna share</p>
              </li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}
