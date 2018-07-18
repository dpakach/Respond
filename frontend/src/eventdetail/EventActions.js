import React, {Component} from 'react';

export default class EventActions extends Component {
  render() {
    return (
      <div clasNames="card detail__card">
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
            <a href="#">
              <li>
                <i className="material-icons card__icon card__icon--2">message</i>
                <p>lorem</p>
              </li>
            </a>
            <a href="#">
              <li>
                <i className="material-icons card__icon card__icon--3">home</i>
                <p>lorem</p>
              </li>
            </a>
            <a href="#">
              <li>
                <i className="material-icons card__icon card__icon--4">home</i>
                <p>lorem</p>
              </li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}
