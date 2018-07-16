import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WarningIcon from "@material-ui/icons/Warning";
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";

const styles = {
  root: {
    width: 500
  }
};

class BottomNavigationBar extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Alerts" icon={<WarningIcon />} />
        <BottomNavigationAction label="Channels" icon={<MessageIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    );
  }
}

BottomNavigationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomNavigationBar);