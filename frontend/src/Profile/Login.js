import React from 'react';
import Overlay from '../Overlay';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default class LoginOverlay extends React.Component {

  state = {
    login: true,
  };

  toggle_tab = () => {
    this.setState({login: !this.state.login});
  };

  change_tab_login = () => {
    if(!this.state.login){
      this.toggle_tab();
    }
  }

  change_tab_signup = () => {
    if(this.state.login){
      this.toggle_tab();
    }
  }

  getClassName = (val) => {
    if(val === this.state.login){
      return "tabs__tab tabs__tab--active";
    } else {
      return "tabs__tab"
    }
  }

  render() {
    return (
      <div className="section section--login">
        <div className="tabs">
          <div className="tabs__header">
            <div className={this.getClassName(true)} onClick={this.change_tab_login}>Login</div>
            <div className={this.getClassName(false)} onClick={this.change_tab_signup}>Signup</div>
          </div>

          <div className="tabs__body">
            <div className="tabs__content">
              <div>
                <div>
              {this.state.login && 
                <LoginForm />
              }
                </div>
                <div>
              {!this.state.login && 
                <SignupForm toggle={this.toggle_tab}/>
              }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
