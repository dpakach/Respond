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

    return (
      <div>
        <div className="navigation">
          <h1 className="navigation__title">RESPOND</h1>
          <ul className="navigation__list">
            <Link to="/">
              <li className="navigation__item navigation__item--active">
                <i className="material-icons navigation__icon">warning</i>
                <p className="navigation__label">Alerts</p>
              </li>
            </Link>
            <Link to="/channel">
            <li className="navigation__item">
              <i className="material-icons navigation__icon">email</i>
              <p className="navigation__label">channels</p>
            </li>
            </Link>
            <Link to="/profile">
            <li className="navigation__item">
              <i className="material-icons navigation__icon">account_circle</i>
              <p className="navigation__label">profile</p>
            </li>
            </Link>
          </ul>
        </div>
        {/*
        
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <Link to="/">
          <BottomNavigationAction label="Alerts" icon={<WarningIcon />} />
        </Link>
        <Link to="/channel">
          <BottomNavigationAction label="Channels" icon={<MessageIcon />} />
        </Link>
        <Link to="/profile">
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </Link>
      </BottomNavigation>
        */}
      </div>
    );
  }
}

BottomNavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavigationBar);
