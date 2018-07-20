import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WarningIcon from '@material-ui/icons/Warning';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    width: 500,
  },
};

class BottomNavigationBar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    const user = JSON.parse(localStorage.getItem('user'));
    const logged_in = localStorage.getItem('accessToken');

    let is_responder = false;

    if (user) {
      is_responder = user.is_respondent;
    }

    const getClassName = (val) => {
      const route = window.location.pathname.split('/')[1]
      if(val==route){
        return "navigation__item navigation__item--active"
      }else {
        return "navigation__item"
      }
    }

    return (
      <div>
        <div className="navigation">
          <h1 className="navigation__title">RESPOND</h1>
          <ul className="navigation__list">
            <Link to="/">
              <li className={getClassName("")}>
                <i className="material-icons navigation__icon">warning</i>
                <p className="navigation__label">Alerts</p>
              </li>
            </Link>
            {logged_in && (
              <Link to="/add">
                <li className={getClassName("add")}>
                  <i className="material-icons navigation__icon">add_alert</i>
                  <p className="navigation__label">Add Alert</p>
                </li>
              </Link>
            )}
            <Link to="/channels">
              <li className={getClassName('channels')}>
                <i className="material-icons navigation__icon">email</i>
                <p className="navigation__label">channels</p>
              </li>
            </Link>

            {JSON.parse(localStorage.getItem('user')).is_responder && (
              <Link to="/verify">
                <li className={getClassName("verify")}>
                  <i className="material-icons navigation__icon">verified_user</i>
                  <p className="navigation__label">Verify Alerts</p>
                </li>
              </Link>
            )}
            <Link to="/profile">
              <li className={getClassName("profile")}>
                <i className="material-icons navigation__icon">
                  account_circle
                </i>
                <p className="navigation__label">profile</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

BottomNavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavigationBar);
