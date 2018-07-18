import React, {Component} from 'react';
import Message from './Message';

export default class Messages extends Component {
  state = { messages: [
    {message: 'lorem'},
    {message: 'ipusm'}
  ]}

  render() {
    console.log(this.state.messages);
    return (
        <div>
          {this.state.messages.map(message => <Message key={Math.random()} message={message}/> )}
        </div>
    );
  }
}
