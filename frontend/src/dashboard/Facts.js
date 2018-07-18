import React, {Component} from 'react';

export default class Event extends Component {
  render() {
    const {casualties, alerts, messages} = this.props;
    console.log(casualties);
    return (
      <div class="facts">
        <div class="fact">
          <i class="material-icons fact__icon fact__icon--1">trending_up</i>
          <div class="fact__value">{casualties}</div>
        </div>
        <div class="fact">
          <i class="material-icons fact__icon fact__icon--2">local_hospital</i>
          <div class="fact__value">{alerts}</div>
        </div>
        <div class="fact">
          <i class="material-icons fact__icon fact__icon--3">announcement</i>
          <div class="fact__value">{messages}</div>
        </div>
      </div>
    );
  }
}
