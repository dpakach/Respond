import React from 'react';
import _ from 'lodash';
import {messages} from '../Database';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';

import user_details from '../auth/Authentication';
import Button from '@material-ui/core/Button';

import axios from 'axios';

export default class MessageInput extends React.Component {
  state = {message: '', id: this.props.match.params.id};

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const form_data = _.pick(this.state, ['message', 'id']);
    const user = JSON.parse(localStorage.getItem('user'));
    form_data.user = user.username;
    form_data.user_id = user.id;
    form_data.created_at = moment().format();

    if (this.props.private) {
      form_data.private = true;
    } else {
      form_data.private = false;
    }
    messages
      .create(form_data)
      .then(

        messages
          .fetch_all()
          .then(querySnapshot => {
            this.setState({message: ''});
            querySnapshot.forEach(doc => {
              console.log(doc.data());
            });
            this.props.refresh();
          })
          .catch(e => {
            console.log(e);
          }),
      )
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField
            type="text"
            name="message"
            value={this.state.message}
            style={{width: '100%'}}
            onChange={this.handleChange}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    );
  }
}
