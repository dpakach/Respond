import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class LoginForm extends React.Component {
  state = {
    password: "",
    username: ""
  };
  submitForm = () => {
    let data = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post("http://localhost:8000/api/token/", data).then(data => {
      localStorage.setItem("accessToken", data.data.access);
      localStorage.setItem("refreshToken", data.data.refresh);
      axios.get('/api/user/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      }).then(data => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data.data));
      }).then(() => {
        window.location.pathname = '/profile/';
      })
    });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{width: '100%', display: 'block', margin: '0 auto'}} onSubmit={this.submitForm}>
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-username">Username</InputLabel>
          <Input
            id="adornment-username"
            type={"people"}
            value={this.state.username}
            onChange={this.handleChange("username")}
          />
        </FormControl>
        <br />
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? "text" : "password"}
            value={this.state.password}
            onChange={this.handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{marginTop: '2rem'}}
          htmlType="submit"
          className={classes.button}
          onClick={this.submitForm}
        >
          Login
          <Icon className={classes.rightIcon}>Login</Icon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
