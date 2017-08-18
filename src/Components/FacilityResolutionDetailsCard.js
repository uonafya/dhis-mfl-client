import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

function FacilityResolutionDetailsCard(props) {
  const classes = props.classes;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            DHIS2 ID: {props.facilityMeta.id}
          </Typography>
          <Typography type="headline" component="h2">
          {props.facilityMeta.name}{bull}{(props.facilityMeta.name.didResolve && props.facilityMeta.code.didResolve) ? " Resolved :)":" Unresolved :("}
          </Typography>
          <Typography type="body1" className={classes.pos}>
            DHIS2 Code: {props.facilityMeta.dhis2Code}
          </Typography>
          <hr />
          <Typography component="p">
              (props.facilityMeta.name.didResolve && props.facilityMeta.code.didResolve) ? (
                MFL Name: {props.props.facilityMeta.name.meta.mflName}
                MFL Code: {props.props.facilityMeta.code.meta.mflCode}
              ) : (

              )
           
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense disabled>Advanced Details</Button>
        </CardActions>
      </Card>
    </div>
  );
}

FacilityResolutionDetailsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FacilityResolutionDetailsCard);