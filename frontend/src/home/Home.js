import React from "react";
import Map from "../map/Map";
import AddAlertBtn from "./AddAlertBtn";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        Respond! <Map />
        <div>
          <AddAlertBtn />{" "}
        </div>
      </div>
    );
  }
}
