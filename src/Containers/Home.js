import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';

import Snackbar from "./Snackbar"

import * as authenticationActions from "../Store/Authentication/actions"
import * as authenticationSelectors from "../Store/Authentication/selectors"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

class Home extends Component {

    componentWillMount(){
        this.props.authenticationActions.mflApiAuth()
    }

    handleChange = (event, index, value) => console.log(index,value);

    render(){
        return(
            <div>
                <div>
                {
                    this.props.isAppAuthenticated ? (
                        <div>
                            {/* <DropDownMenu value={1} onChange={this.handleChange}>
                                <MenuItem value={1} primaryText="Never" />
                                <MenuItem value={2} primaryText="Every Night" />
                                <MenuItem value={3} primaryText="Weeknights" />
                                <MenuItem value={4} primaryText="Weekends" />
                                <MenuItem value={5} primaryText="Weekly" />
                            </DropDownMenu> */}
                        </div>
                    ) : (
                            <Snackbar />
                        )
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // userInformation : authenticationSelectors.getUserInformation(state)
        // mflAuthKey: authenticationSelectors.getAuthKey(state),
        // mflUserInformation: authenticationSelectors.getMflUserInformation(state)
        isAppAuthenticated: authenticationSelectors.isAppAuthenticated(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authenticationActions: bindActionCreators(authenticationActions, dispatch)
    }
}

const homePageConnect =  connect(mapStateToProps, mapDispatchToProps,)(Home)

export default withStyles(styles)(homePageConnect)