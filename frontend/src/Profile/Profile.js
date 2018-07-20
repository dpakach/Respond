import React from 'react';
import moment from 'moment';

var user = JSON.parse(localStorage.getItem('user'));
var test = {
  basicInfo: {
    name: 'Jane Doe',
    gender: 'Female',
    birthday: 'April 3, 1990',
    location: 'Los Angeles, CA',
    photo: 'https://material-ui.com/static/images/material-ui-logo.svg',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi.',
  },
};

class Avatar extends React.Component {
  render() {
    var image = this.props.image,
      style = {
        width: this.props.width || 50,
        height: this.props.height || 50,
      };

    if (!image) return null;

    return (
      <div className="avatar" style={style}>
        <img src={this.props.image} />
      </div>
    );
  }
}

class MainPanel extends React.Component {
  render() {
    var info = this.props.info;
    if (!info) return null;

    return (
      <div>
        <div className="section section--login">
          <div className="tabs" style={{maxWidth: '80vw'}}>
            <div className="tabs__header">
              <div className="tabs__tab">
                <h3>Profile</h3>
              </div>
            </div>
            <div className="tabs__body">
              <div className="top">
                <Avatar
                  image="https://randomuser.me/api/portraits/men/71.jpg"
                  width={100}
                  height={100}
                />
                <div style={{marginTop: '2rem'}}>
                  <h2>
                    {info.first_name} {info.last_name}
                  </h2>
                  <h3>
                    @{info.username}
                    {'     '}
                    <a
                      onClick={() => {
                        localStorage.clear();
                        window.location.pathname = '/profile/';
                      }}
                      style={{cursor: 'pointer'}}
                    >
                      logout
                    </a>
                  </h3>

                  <h3>{info.location}</h3>

                  <hr />
                  <p>{info.gender}</p>
                </div>
              </div>

              <div className="bottom">
                <h4>Biography</h4>
                <p>{info.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default class UserProfile extends React.Component {
  render() {
    return (
      <div id="user-profile">
        <MainPanel info={user} />
      </div>
    );
  }
}
