import React from 'react';
import Overlay from '../Overlay';
import LoginForm from './LoginForm';

export default class LoginOverlay extends React.Component {
  render() {
    return (
      <div className="section section--login">
        <div className="tabs">
          <div className="tabs__header">
            <div className="tabs__tab tabs__tab--active">Login</div>
            <div className="tabs__tab">Signup</div>
          </div>

          <div className="tabs__body">
            <div className="tabs__content">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
