import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

import * as authenticationActions from "../Store/Authentication/actions"
import * as authenticationSelectors from "../Store/Authentication/selectors"

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

class SnackbBar extends Component {

  render() {

    const handleRequest = (event, reason) => {
      event.preventDefault()
      this.props.authenticationActions.mflApiAuth()
      return
    } 

    const handleRequestClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      } 
  
    };

    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.openSnackbar}
          autoHideDuration={6e3}
          onRequestClose={handleRequestClose.bind(this)}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
          action={[
            <Button key="retry" color="accent" dense onClick={handleRequest.bind(this)}>
              Retry
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleRequestClose.bind(this)}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SnackbBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
      // userInformation : authenticationSelectors.getUserInformation(state)
      // mflAuthKey: authenticationSelectors.getAuthKey(state),
      // mflUserInformation: authenticationSelectors.getMflUserInformation(state)
      message: authenticationSelectors.getSnackbarMessage(state),
      openSnackbar: authenticationSelectors.getSnackbarMode(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      authenticationActions: bindActionCreators(authenticationActions, dispatch)
  }
}

const snackBarConnet =  connect(mapStateToProps, mapDispatchToProps,)(SnackbBar)

export default withStyles(styles)(snackBarConnet)