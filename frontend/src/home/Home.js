import React from "react";
import Map from "../map/Map";
import AddAlertBtn from "./AddAlertBtn";

export default class Home extends React.Component {
  render() {
    return (
      <div className="dashboard__head">
        <Map />
        {/*
        <div className="card dashboard__card">
          <AddAlertBtn />
        </div>
        */}
      </div>
    );
  }
}
