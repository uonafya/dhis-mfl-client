import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import WarningIcon from 'material-ui-icons/Warning';
import DoneIcon from 'material-ui-icons/Done';
import InfoIcon from 'material-ui-icons/InfoOutline';

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
  const colorRed = "#C62828"
  const colorGreen = "#2E7D32"
  const colorAmber = "#EF6C00"

  var nameStatusColor = {color: colorRed}
  var codeStatusColor = {color: colorRed}
  var resolutionStatusColor = <InfoIcon style={{color: colorAmber}} />

  if(props.facilityMeta.name.didResolve){nameStatusColor = {color: colorGreen}}
  if(props.facilityMeta.code.didResolve){codeStatusColor = {color: colorGreen}}

  if(props.facilityMeta.name.didResolve
     && props.facilityMeta.code.didResolve)
     {
       resolutionStatusColor = <DoneIcon style={{color: colorGreen}} />
     }else if(!props.facilityMeta.name.didResolve
      && !props.facilityMeta.code.didResolve){
        resolutionStatusColor = <WarningIcon style={{color: colorRed}} />
      }



  return (
    <div>
      <Card className={classes.card}>
        <CardContent>          
          <Typography type="headline" component="h2">
            {props.facilityMeta.name.meta.dhis2Name} {resolutionStatusColor}
          </Typography>
          {
            <div>
              <br />
              <Typography type="body1" className={classes.title}>
                Name
              </Typography>
              <Typography component="p" style={nameStatusColor}>
                <b>MFL:</b> {props.facilityMeta.name.meta.mflName}&nbsp;&nbsp;{bull}&nbsp;&nbsp;
                <b>DHIS2:</b> {props.facilityMeta.name.meta.dhis2Name}
              </Typography>
              <br />
              <Typography type="body1" className={classes.title}>
                Code
              </Typography>
              <Typography component="p" style={codeStatusColor}>
                <b>MFL:</b> {props.facilityMeta.code.meta.mflCode}&nbsp;&nbsp;{bull}&nbsp;&nbsp;
                <b>DHIS2:</b> {props.facilityMeta.code.meta.dhis2Code}
              </Typography>
            </div>
          }
        </CardContent>
        <CardActions>
          <Button dense >Advanced Details</Button>
        </CardActions>
      </Card>
    </div>
  );
}

FacilityResolutionDetailsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FacilityResolutionDetailsCard);