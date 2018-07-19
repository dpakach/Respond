import React from 'react';
import {Link} from 'react-router-dom';

import {incidents} from '../Database';
import Facts from '../dashboard/Facts';
import Alerts from './Alerts';

export default class Channels extends React.Component {
  channels = [];
  state = {channels: [], loading: false};

  refreshChannels = data => this.setState({channels: data});

  componentWillMount() {
    this.setState({channels: [], loading: false});
    incidents.syncSubscribe(this.refreshChannels);
  }

  componentDidMount() {
    this.setState({channels: [], loading: true});
    incidents
      .fetch_verified_only()
      .get()
      .then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        this.setState({channels: data, loading: false});
      });
  }
  facts = {
    casualties: 200,
    alerts: 2000,
    messages: 4000,
  };
  render() {
    return (
      <div>
        <Alerts />
        <div className="list">
          <h2 className="dashboard__header">Channels</h2>
          {!this.state.loading && (
            <div style={{}}>
              {this.state.channels.map(channel => (
                <Link to={`/events/${channel.id}/channel`} key={channel.id}>
                  <div className="list-item" style={{marginBottom: '1rem'}}>
                    <div className="list-item__title">{'lorem ipsum'}</div>
                    <Facts facts={this.facts} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
