import React, {Component} from 'react';


export default class AddAlertForm extends Component {

  state = {}

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render(){
    return(
      <form action="" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="description" />
        <input type="submit" value="submit" onClick={this.handleSubmit}/>
      </form>
    )
  }
}
