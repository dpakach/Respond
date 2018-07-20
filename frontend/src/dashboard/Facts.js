import React, { Component } from "react";

export default class Event extends Component {
  render() {
    const { casualties, donation, messages } = this.props.facts;
    return (
      <div className="facts">
        <div className="fact">
          <i className="material-icons fact__icon fact__icon--1">accessible</i>
          <div className="fact__value">{casualties}</div>
        </div>
        <div className="fact">
          <i className="material-icons fact__icon fact__icon--2">
            monetization_on
          </i>
          <div className="fact__value">{donation}</div>
        </div>
        <div className="fact">
          <i className="material-icons fact__icon fact__icon--3">
            announcement
          </i>
          <div className="fact__value">{messages}</div>
        </div>
      </div>
    );
  }
}
