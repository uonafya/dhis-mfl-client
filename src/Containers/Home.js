import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import { withStyles } from 'material-ui/styles'

import * as authenticationActions from "../Store/Authentication/actions"
import * as authenticationSelectors from "../Store/Authentication/selectors"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
})

class Home extends Component {

    componentDidMount(){
        this.props.authenticationActions.mflApiAuth()
    }

    render(){
        return(
            <div>
                <h1>Home</h1>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // userInformation : authenticationSelectors.getUserInformation(state)
        // mflAuthKey: authenticationSelectors.getAuthKey(state),
        // mflUserInformation: authenticationSelectors.getMflUserInformation(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authenticationActions: bindActionCreators(authenticationActions, dispatch)
    }
}

const homePageConnect =  connect(mapStateToProps, mapDispatchToProps,)(Home)

export default withStyles(styles)(homePageConnect)