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

  //console.log(props.facilityMeta.name.didResolve)

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="body1" className={classes.title}>
            {props.facilityMeta.id}
          </Typography>
          
            {
              (props.facilityMeta.name.didResolve && props.facilityMeta.code.didResolve) ? (
                <Typography type="headline" component="h2">
                  {props.facilityMeta.name.meta.dhis2Name} {bull} Resolved :)
                </Typography>
              ) : (
                <Typography type="headline" component="h2">
                  {props.facilityMeta.name.meta.dhis2Name} {bull} Unresolved :(
                </Typography>
              )
            }
          {
            <div>
              <br />
              <Typography type="body1" className={classes.title}>
                Name
              </Typography>
              <Typography component="p">
                MFL: {props.facilityMeta.name.meta.mflName}&nbsp;&nbsp; {bull} &nbsp;&nbsp;
                DHIS2: {props.facilityMeta.name.meta.dhis2Name}
              </Typography>
              <br />
              <Typography type="body1" className={classes.title}>
                Code
              </Typography>
              <Typography component="p">
                MFL: {props.facilityMeta.code.meta.mflCode}&nbsp;&nbsp; {bull} &nbsp;&nbsp;
                DHIS2: {props.facilityMeta.code.meta.dhis2Code}
              </Typography>
            </div>
          }
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