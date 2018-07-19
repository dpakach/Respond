import React, {Component} from 'react';
import Message from './Message';

import {messages} from '../Database';

export default class Messages extends Component {
  state = {messages: []};

  refreshMessages = data => this.setState({messages: data});

  componentWillMount() {
    this.setState({messages: []});
    messages.syncSubscribe(this.refreshMessages, this.props.match.params.id);
  }

  componentWillUnmount() {
    messages.unsubscribe(this.refreshMessages);
  }

  componentDidMount() {

    if(this.props.private){
      messages
        .fetch_private_by_id(this.props.match.params.id)
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            data.push(doc.data());
          });
          this.setState({messages: data});
        });
    }else {
      messages
        .fetch_by_id(this.props.match.params.id)
        .get()
        .then(querySnapshot => {
          let data = [];
          querySnapshot.forEach(doc => {
            data.push(doc.data());
          });
          this.setState({messages: data});
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.messages && (
              <div className="messages">
            {this.state.messages.map(m => <Message key={Math.random()} message={m} />)}
          </div>
        )}
      </div>
    );
  }
}
