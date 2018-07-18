import React, {Component} from 'react';
import BottomNavigationBar from './NavbarButtom.js';
import Dashboard from './dashboard/Dashboard';
import AddAlertBtn from './home/AddAlertBtn';
import Map from './map/Map';
import EventDetail from './eventdetail/EventDetail';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './home/Home';
import Channel from './channels/Channel';
import Channels from './channels/Channels';

export class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="main-content">
            <main>
              <Router>
                <div>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/channels" component={Channels} />
                  <Route exact path="/events/:id" component={EventDetail} />
                  <Route path="/events/:id/channel" component={Channel} />
                  <BottomNavigationBar />
                </div>
              </Router>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
