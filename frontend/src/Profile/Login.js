import React from "react";
import Overlay from "../Overlay";
import LoginForm from "./LoginForm";

export default class LoginOverlay extends React.Component {
  render() {
    return (
      <Overlay
        visible={this.props.visible}
        header={"Login"}
        description={"Please enter your credentials below"}
        closeOverlay={this.props.closeOverlay}
      >
        {" "}
        <LoginForm />
      </Overlay>
    );
  }
}
