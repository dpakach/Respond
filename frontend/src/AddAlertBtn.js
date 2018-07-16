import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { getLocation } from "./Location";
import { IncidentsDB } from "./Database";

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
  let incident = new IncidentsDB();
  console.log("report:", report);
  console.log("incident: ", incident);
  incident.create(report).then(
    incident.fetch_all().then(querySnapshot => {
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
