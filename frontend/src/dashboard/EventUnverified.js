import React, {Component} from 'react';

import Event from './Event';
import {getLocation} from '../Location';
import {incidents} from '../Database';

export default class Events extends Component {
  events = [{}];
  state = {events: []};

  state = {
    position: null,
  };

  refreshEvents = data => this.setState({events: data});

  componentWillMount() {
    this.setState({events: []});
    incidents.syncSubscribe(this.refreshEvents);
  }

  componentDidMount() {
    incidents
      .fetch_unverified_only()
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        this.setState({events: data});
      });
  }

  verify = (event) => {
    incidents.collection.doc(event.id).set({
      ...event, status: 'verified'
    }) 
  }

  render() {
    console.log(this.state.events);
    return (
        <div className="section section--login">
          <div className="tabs">
            <div className="tabs__header">
              <div className="tabs__tab">
                <h2>Verify Incidents</h2>
              </div>
            </div>
            <div className="tabs__body">
              <div className="list">
                {this.state.events.map(event => (
                  <div>
                    <Event key={event.id} event={event} />

                    {
                      !(event.status !== 'verified') &&
                      <button onClick={this.verify(event)}>verify</button>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
  }
}
