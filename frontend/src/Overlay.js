import React from "react";

export default class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: "100%"
      }
    };
    this.openOverlay = this.openOverlay.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.closeNav);
    this.openOverlay();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeNav);
  }

  openOverlay() {
    const style = { width: "100%" };
    this.setState({ style });
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.addEventListener("click", this.closeNav);
  }

  closeOverlay() {
    document.removeEventListener("click", this.closeNav);
    const style = { width: 0 };
    this.setState({ style });
    document.body.style.backgroundColor = "#F3F3F3";
    this.props.closeOverlay();
  }

  render() {
    return (
      this.props.visible && (
        <div ref="snav" className="overlay" style={this.state.style}>
          <div className="sidenav-container">
            <div className="text-center">
              <h2>{this.props.header}</h2>
              <p>{this.props.description}</p>
            </div>
            <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={this.closeOverlay}
            >
              ×
            </a>
            <div className="list-group">
              {/*your form component goes here */}
              {this.props.children}
            </div>
          </div>
        </div>
      )
    );
  }
}
