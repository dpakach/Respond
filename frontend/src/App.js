import React, {Component} from 'react';
import BottomNavigationBar from './NavbarButtom.js';
import Dashboard from './dashboard/Dashboard';
import AddAlertBtn from './home/AddAlertBtn';
import Map from './map/Map';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './home/Home';

export class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="main-content">
          <main>
          <Router>
            <div>
              <Route exact path="/" component={Dashboard} />

              <BottomNavigationBar />
            </div>
          </Router>
          </main>
        </div>
      </div>
    );
  }
}
