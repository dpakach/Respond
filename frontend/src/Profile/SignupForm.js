import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class SignupForm extends React.Component {
  state = {
    password: '',
    username: '',
    date_of_birth: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    gender: '',
  };

  submitForm = () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
      date_of_birth: this.state.password,
      first_name: this.state.password,
      last_name: this.state.password,
      email: this.state.password,
      phone: this.state.password,
      gender: this.state.password,
    };

    axios.post('/api/user/', data).then(data => {
      console.log(data);
    });
  };

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}));
  };

  render() {
    const {classes} = this.props;

    return (
      <div
        style={{width: '100%', display: 'block', margin: '0 auto'}}
        onSubmit={this.submitForm}>
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-username">Username</InputLabel>
          <Input
            id="adornment-username"
            type={'people'}
            value={this.state.username}
            onChange={this.handleChange('username')}
          />
        </FormControl>
        <br />

        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-first_name">First Name</InputLabel>
          <Input
            id="adornment-first_name"
            type={'people'}
            value={this.state.username}
            onChange={this.handleChange('first_name')}
          />
        </FormControl>
        <br />
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-last_name">Last Name</InputLabel>
          <Input
            id="adornment-last_name"
            type={'people'}
            value={this.state.username}
            onChange={this.handleChange('last_name')}
          />
        </FormControl>
        <br />

        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}>
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />

        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">confirm Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password2')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}>
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <br />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="gender">Gender</InputLabel>
          <Select
            style={{width: '10rem'}}
            value={this.state.gender}
            onChange={this.handleChange}
            inputProps={{
              name: 'gender',
            }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>

        <br />
        <TextField
          id="date"
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          defaultValue="2017-05-24"
          value={this.state.date_of_birth}
          handleChange={this.handleChange('date_of_birth')}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <br />
        <Button
          variant="contained"
          color="primary"
          htmlType="submit"
          style={{marginTop: '2rem'}}
          className={classes.button}
          onClick={this.submitForm}>
            Submit
          <Icon className={classes.rightIcon}>Login</Icon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(SignupForm);
