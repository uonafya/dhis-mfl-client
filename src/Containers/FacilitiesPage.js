import React, { Component } from "react"
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Paper from "material-ui/Paper"
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import * as orgUnitActions from "../Store/OrgUnits/actions"
import * as orgUnitSelectors from "../Store/OrgUnits/selectors"
import { orgLevels } from "../Store/OrgUnits/actions"

import OrgUnitItem from "../Components/OrgUnitItem"
import OrgUnitForm from "../Components/OrgUnitForm"
import WardItem from "../Components/WardItem"

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    demo: {
      height: 240,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      height: '100%',
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
  })
  
class FacilitiesPage extends Component {

    componentDidMount() {
        this.props.orgUnitActions.getCounties(orgLevels.counties)
    }

    render() {
        const classes = this.props.classes
        return (
            <Grid container spacing={24}>
                <Grid item xs={12} sm={4} >
                    <Grid container spacing={24} direction='column' justify='flex-start' >
                        <Card className={classes.control}  >
                            {
                                this.props.countiesIsFetched ? (
                                    <OrgUnitForm
                                        counties={this.props.counties}
                                        constituenciesIsFetched={this.props.constituenciesIsFetched}
                                        constituencies={this.props.constituencies}
                                        getConstituencies={this.props.orgUnitActions.getConstituencies}
                                        getWards={this.props.orgUnitActions.getWards} />
                                ) : (
                                        <h4>Loading</h4>
                                    )
                            }
                        </Card>
                        <Paper className={classes.paper}>
                            {
                                this.props.wardsIsFetched ? (
                                    <List >
                                        {
                                            this.props.wards.map((ward, i) => (
                                                <WardItem key={i} ward={ward} />
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
                <Grid item xs={12} sm={8}>
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
        orgUnits: orgUnitSelectors.getOrgUnits(state),

        countiesIsFetched: orgUnitSelectors.getCountyFetchStatus(state),
        counties: orgUnitSelectors.getCounties(state),

        constituenciesIsFetched: orgUnitSelectors.getConstituencyFetchStatus(state),
        constituencies: orgUnitSelectors.getConstituencies(state),

        wardsIsFetched: orgUnitSelectors.getWardsFetchedStatus(state),
        wards: orgUnitSelectors.getWards(state),

        facilitiesIsFetched: orgUnitSelectors.getFacilityFetchStatus(state),
        facilities: orgUnitSelectors.getFacilities(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orgUnitActions: bindActionCreators(orgUnitActions, dispatch)
    }
}
const FaciliyPageConnect = connect(mapStateToProps, mapDispatchToProps)(FacilitiesPage)

export default withStyles(styles)(FaciliyPageConnect)