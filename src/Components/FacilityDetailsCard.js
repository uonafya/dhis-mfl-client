import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import classnames from 'classnames';
import pstyles from './PrettyJSON'

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



class FacilityDetilsCard extends Component{

state = { expanded: false };

handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
};
    

render(){

    const classes = this.props.classes;
    const bull = <span className={classes.bullet}> • </span>;
    
    var credentials = {}
    const handleUsernameChange = (event) => {        
        credentials = {
            ...credentials,
            username : event.target.value
        }
    }
    
    const handlePasswordChange = (event) => {
        credentials={
            ...credentials,
            password : event.target.value
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()        
        //props.submitAction(credentials)
        this.props.checkMflUserDetails()
    }

    return (
        
            <div>
              <Card className={classes.card}>
                <CardContent>
                  <Typography type="body1" className={classes.title}>
                    {this.props.facility.facility_type_name}
                  </Typography>
                  <Typography type="headline" component="h2">
                  {this.props.facility.official_name}{bull}{this.props.facility.operation_status_name}
                  </Typography>
                  <Typography type="body1" className={classes.pos}>
                  {this.props.facility.code}
                  </Typography>
                  <Typography component="p">
                    Longitude: {this.props.facility.lat_long[0]} <br />
                    Latitide: {this.props.facility.lat_long[1]} <br />
                  </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        dense
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more">
                    Advanced Details</Button>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more">
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                    <CardContent>
                        <div style={pstyles.root}>
                            <div style={pstyles.header} onClick={this.toggle}>
                                <strong>JSON Object</strong>
                            </div>
                            <pre style={pstyles.pre}>
                            {JSON.stringify(this.props.facility, null, 2) }
                            </pre>
                        </div>
                    </CardContent>
                  </Collapse>
              </Card>
            </div>
        
            )
 }
    
}


export default withStyles(styles)(FacilityDetilsCard)