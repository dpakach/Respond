import React from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';

export default class Channel extends React.Component {
  state = {
    public: 'true',
  };

  toggle_tab = () => {
    this.setState({public: !this.state.public});
  };

  change_tab_public = () => {
    if(!this.state.public){
      this.toggle_tab();
    }
  }

  change_tab_private = () => {
    if(this.state.public){
      this.toggle_tab();
    }
  }

  getClassName = (val) => {
    if(val === this.state.public){
      return "tabs__tab tabs__tab--active";
    } else {
      return "tabs__tab"
    }
  }

  render() {
    const logged_in = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    let is_responder = false;
    if(user){
      const {is_responder} = user
    }
    return (
      <div className="section section--login">
        <div className="tabs">
          <div className="tabs__header">
            <div className={this.getClassName(true)} onClick={this.change_tab_public}>
              Public
            </div>
            {!is_responder && (
              <div
                className={this.getClassName(false)}
                onClick={this.change_tab_private}>
                Private
              </div>
            )}
          </div>
          <div className="tabs__body">
            <div>
              {this.state.public && (
                <div className="tabs__content">
                  <Messages {...this.props} />
                  {logged_in && <MessageInput {...this.props} />}
                </div>
              )}
            </div>
            <div>
              {!this.state.public && !is_responder && (
                <div className="tabs__content">
                  <Messages {...this.props} private={true} />
                  {logged_in && <MessageInput {...this.props} private={true} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
