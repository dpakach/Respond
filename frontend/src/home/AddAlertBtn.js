import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getLocation } from "../Location";
import { incidents } from "../Database";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const logPosition = position => {
  let report = {
    location: {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    },
    reported_on: new Date(),
    reported_by: "AnonUser"
  };

  incidents.create(report).then(
    incidents.fetch_all().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
      });
    })
  );
};

function AlertButton(props) {
  const { classes } = props;
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => getLocation(logPosition)}
      className={classes.button}
    >
      Add Alert
    </Button>
  );
}

AlertButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlertButton);
