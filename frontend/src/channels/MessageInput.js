import React from 'react';
import _ from 'lodash';
import {messages} from '../Database';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';

export default class MessageInput extends React.Component {
  state = {message: '', id: this.props.match.params.id};

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const form_data = _.pick(this.state, ['message', 'id']);
    if(false){
      form_data.private = true;
    }
    form_data.created_at = moment().format();
    messages.create(form_data).then(this.setState({message: ''}));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
    );
  }
}
