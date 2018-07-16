import React, { Component } from "react";
import BottomNavigationBar from "./NavbarButtom.js";
import AddAlertBtn from "./AddAlertBtn";
import Map from "./map/Map";

export class App extends Component {
  render() {
    return (
      <div>
        Respond! <Map />
        <div>
          {" "}
          <AddAlertBtn />{" "}
        </div>
        <BottomNavigationBar />
      </div>
    );
  }
}
