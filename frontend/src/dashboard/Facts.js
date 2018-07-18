import React, {Component} from 'react';

export default class Event extends Component {
  render() {
    const {casualties, alerts, messages} = this.props;
    console.log(casualties);
    return (
      <div className="facts">
        <div className="fact">
          <i className="material-icons fact__icon fact__icon--1">trending_up</i>
          <div className="fact__value">{casualties}</div>
        </div>
        <div className="fact">
          <i className="material-icons fact__icon fact__icon--2">local_hospital</i>
          <div className="fact__value">{alerts}</div>
        </div>
        <div className="fact">
          <i className="material-icons fact__icon fact__icon--3">announcement</i>
          <div className="fact__value">{messages}</div>
        </div>
      </div>
    );
  }
}
