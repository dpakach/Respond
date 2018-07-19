import React, {Component} from 'react';

import Events from './Events';
import Home from '../home/Home';

const Dashboard = props => {
  return (
    <div className="dashboard" style={{width:"100%", top:"0"}}>
      <Home />
      <div className="dashboard__content" style={{top: 0}}>
        <h2 className="dashboard__header">Events</h2>
        <span className="icon">
          <i className="material-icons pull">drag_handle</i>
        </span>
        <Events />
      </div>
    </div>
  );
};

export default Dashboard;
