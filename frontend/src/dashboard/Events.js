import React, {Component} from 'react';

import Event from './Event';
import { getLocation } from "../Location";
import { incidents } from "../Database";

export default class Events extends Component {

  events = [
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 1,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    },
    {
      id: 2,
      title: 'lorem Ipsum',
      description: 'Dolor totam nobis eveniet expedita voluptates aliquid dicta. Suscipit dolorem ratione quasi ipsum vel sapiente minima. Quis perferendis officiis aliquam amet consectetur Voluptate corrupti alias facere tempore accusantium Tempora dignissimos!',
      casualties: 200,
      alerts: 2000,
      messages: 4000 
    }
  ]


  state = {
    position: null
  };

  refreshEvents = data => this.setState({ events: data });

  componentWillMount() {
    this.setState({ events: [] });
    incidents.syncSubscribe(this.refreshEvents);
  }

  componentDidMount() {
    getLocation(position =>
      this.setState({
        position: {
          lng: parseFloat(position.coords.longitude),
          lat: parseFloat(position.coords.latitude)
        }
      })
    );
    console.log(
      "incidents: ",
      incidents
        .fetch_verified_only()
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            data.push(doc.data());
          });
          this.setState({ events: data });
        })
    );
  }



  render() {
    return (
      <div className="list">
        {this.state.events.map(event => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    )
  }
}
