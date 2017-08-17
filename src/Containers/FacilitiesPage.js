import React, { Component } from "react"
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Paper from "material-ui/Paper"
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import * as orgUnitActions from "../Store/OrgUnits/actions"
import * as orgUnitSelectors from "../Store/OrgUnits/selectors"
import { orgLevels } from "../Store/OrgUnits/actions"

import OrgUnitItem from "../Components/OrgUnitItem"

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
    }
})


class FacilitiesPage extends Component {

    componentDidMount() {
        this.props.orgUnitActions.getOrgUnits(orgLevels.wards)
    }

    render() {
        const classes = this.props.classes
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        
                    </Paper>
                    <Paper className={classes.paper}>
                        {
                            this.props.orgUnitsIsFetched ? (
                                <List className={classes.root}>
                                    {
                                        this.props.orgUnits.map((orgUnits, i) => (
                                            <OrgUnitItem key={i} orgUnit={orgUnits} />
                                        ))
                                    }
                                </List>
                            ) : (
                                    <h4>Loading</h4>
                                )
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        {
                            this.props.facilitiesIsFetched ? (
                                <List className={classes.root}>
                                    {
                                        this.props.facilities.map((facility, i) => (
                                            <OrgUnitItem key={i} orgUnit={facility} />
                                        ))
                                    }
                                </List>
                            ) : (
                                    <h4>Loading</h4>
                                )
                        }
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

FacilitiesPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        orgUnitsIsFetched: orgUnitSelectors.getorgUnitsFetchStatus(state),
        orgUnits: orgUnitSelectors.getOrgUnits(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orgUnitActions: bindActionCreators(orgUnitActions, dispatch)
    }
}
const FaciliyPageConnect = connect(mapStateToProps, mapDispatchToProps)(FacilitiesPage)

export default withStyles(styles)(FaciliyPageConnect)