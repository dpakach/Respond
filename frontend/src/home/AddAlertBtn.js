import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getLocation} from '../Location';
import {incidents} from '../Database';
import axios from 'axios';
import config from '../config';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class AlertButton extends React.Component {
  state = {description: '', open: false};
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  logPosition = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let report = {
        reported_on: new Date(),
        reported_by: user.username,
        reported_user_id: user.id,
        description: this.state.description,
        first_information: this.state.description,
      };

      console.log('hello');

      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        report.location = location;
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
              position.coords.latitude
            },${position.coords.longitude}&key=${config.apiKey}`,
          )
          .then(data => {
            report.title = data.data.results[0].formatted_address,
              incidents.create(report).then(() => {
                this.setState({description: ''});
              });
          });
      });
    }
  };

  render() {
    const {classes} = this.props;
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        {user && (
          <div>
            <TextField
              id="description"
              variant="multiline"
              label="Description"
              name="description"
              className={classes.textField}
              value={this.state.description}
              onChange={this.handleChange('description')}
              margin="normal"
              style={{width: '100%'}}
            />

            <Button
              variant="contained"
              color="secondary"
              onClick={this.logPosition}
              className={classes.button}>
              Add Alert
            </Button>
          </div>
        )}
        {!user && <p>Login to add Alerts</p>}
      </div>
    );
  }
}

AlertButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlertButton);
