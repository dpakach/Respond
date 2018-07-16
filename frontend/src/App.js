import React, { Component } from "react";
import BottomNavigationBar from "./NavbarButtom.js";
import AddAlertBtn from "./AddAlertBtn";

export class App extends Component {
  render() {
    return (
      <div>
        Hello World!
        <div>
          {" "}
          <AddAlertBtn />{" "}
        </div>
        <BottomNavigationBar />
      </div>
    );
  }
}
