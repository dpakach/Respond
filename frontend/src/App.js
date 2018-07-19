import React, { Component } from "react";
import BottomNavigationBar from "./NavbarButtom.js";
import Dashboard from "./dashboard/Dashboard";
import AddAlertBtn from "./home/AddAlertBtn";
import Map from "./map/Map";
import EventDetail from "./eventdetail/EventDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home/Home";
import LoginOverlay from "./Profile/Login";
import UserProfile from "./Profile/Profile";
import messaging from "./messaging";

class ProfileContainer extends Component {
  closeOverlay = () => {
    this.setState({ visible: false });
  };

  openOverlay = () => {
    this.setState({ visible: true });
  };
  state = {
    visible: true
  };
  render() {
    let Container;
    if (!localStorage.getItem("accessToken")) {
      Container = (
        <LoginOverlay
          visible={this.state.visible}
          closeOverlay={this.closeOverlay}
        />
      );
    } else {
      Container = <UserProfile />;
    }
    return Container;
  }
}

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
                  <Route path="/events/:id" component={EventDetail} />
                  <Route
                    path="/profile"
                    render={props => <ProfileContainer {...props} />}
                  />

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
