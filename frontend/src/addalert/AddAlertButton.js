import React, {Component} from 'react';
import AddAlertForm from './AddAlertForm';

export default class AddAlertButton extends Component {
  state = {show_form: false};

  toggle_form = () => {
    this.setState({show_form: !this.state.show_form});
  };

  render() {
    return (
      <div>
        <h1>Add Alert Button</h1>

        <button onClick={this.toggle_fom}> Add Alert </button>
        {this.state.show_form && (
          <div>
            <AddAlertForm />
            <button onClick={this.toggle_fom}>cancel</button>
          </div>
        )}
      </div>
    );
  }
}
