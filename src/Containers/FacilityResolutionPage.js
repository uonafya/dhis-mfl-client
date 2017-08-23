import React, { Component } from "react"
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import FacilityResolutionDetailsCard from "../Components/FacilityResolutionDetailsCard"

import * as facilityActions from "../Store/OrgUnits/actions"
import * as facilitySelectors from "../Store/OrgUnits/selectors"


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.background.paper
    },
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
      }),
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
      },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
})


class FacilityResolutionPage extends Component {

    componentDidMount() {

        //this.props.facilityActions.getFacilities()
        //this.props.facilityActions.resolveMflFacility((require("json-loader!../../data/test-data.json")))
        this.props.facilityActions.resolveMflFacility(
            [
                {
                    "id": "yUUfe6VC8Ra",
                    "dhis2Name": "Pharmart chemist ABC Place",
                    "dhis2Code": 0
                },
                {
                    "id": "Smgomyf1mXV",
                    "dhis2Name": "Besiobei",
                    "dhis2Code": 23007
                },
                {
                    "id": "LgEtXZGfmKk",
                    "dhis2Name": "Allexa",
                    "dhis2Code": 2300
                },
                {
                    "id": "Smgomyf1mXV",
                    "dhis2Name": "Amani Dispensary",
                    "dhis2Code": 23004
                },
                {
                    "id": "LgEtXZGfmKk",
                    "dhis2Name": "huruma testhuruma test",
                    "dhis2Code": 23003
                }
            ]
        )
        //console.log("@Facilities Page:", this.props.mflFacilities, this.props.mflFacilitiesIsFetched)
    }

    render() {
        const classes = this.props.classes
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div style={{fontFamily: "Arial"}}>
                <h1 style={{textAlign: "center"}}>Resolving DHIS2-MFL Facilities</h1>
                <div style={{textAlign: "center", marginLeft: "20%", marginRight: "20%"}}>
                    {this.props.mflFacilityResolutionIsCompleted ? (
                        <Paper className={classes.root} elevation={4} style={{textAlign: "left"}}>
                            <br />
                            <Typography type="headline" gutterBottom>
                                Facility Resolution Summary
                            </Typography>
                            <Typography type="body2" gutterBottom>
                                Resolved via Name &amp; Code:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes}
                            </Typography>
                            <Typography type="body2" gutterBottom>
                                Resolved via Name:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedNames}
                            </Typography>
                            <Typography type="body2" gutterBottom>
                                Resolved via Code:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedCodes}
                            </Typography>
                            <br />
                            <Typography type="body1" className={classes.title}>
                            Total Resolved:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes+
                                                        this.props.mflFacilityResolutionSummary.resolvedNames+
                                                        this.props.mflFacilityResolutionSummary.resolvedCodes}
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bull}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Total Unresolved:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.total - (
                                this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes+
                                                        this.props.mflFacilityResolutionSummary.resolvedNames+
                                                        this.props.mflFacilityResolutionSummary.resolvedCodes
                            )}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{bull}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            TOTAL:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.total}
                            </Typography>
                        </Paper>
                    ) : (
                        <Paper className={classes.root} elevation={4}>
                            <Typography type="headline" component="h3">
                            Facility Resolution Summary
                            </Typography>
                            <Typography type="body1" component="p">
                            Waiting for facility resolution to complete...
                            </Typography>
                        </Paper>
                    )}
                </div>
                {
                    this.props.mflFacilityResolutionIsCompleted ? (
                        
                        this.props.resolvedMflFacilities.map((facilityMeta, i) => (
                                <div key={i} style={{margin: "50px", marginRight: "35%"}} >
                                    <FacilityResolutionDetailsCard facilityMeta={facilityMeta} />
                                </div>
                            )
                        )
                        
                        ) : (
                            <div style={{marginTop: "10%", textAlign: "center"}}>
                                <CircularProgress className={classes.progress} size={50} />
                                <br />
                                {
                                    this.props.mflFacilityResolutionIsStarted ? (
                                        <div>
                                            <h3>Loading... Please wait</h3>
                                            <p>{this.props.mflFacilityResolutionStatus}</p>
                                        </div>
                                    ) : (
                                        <h3>Error! Resolution failed to start</h3>
                                    )
                                }
                            </div>
                        )
                }
            </div>
        )
    }
}

FacilityResolutionPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        // facilitiesIsFetched: facilitySelectors.getFacilitiesFetchStatus(state),
        // facilities: facilitySelectors.getFacilities(state),
        // mflFacilitiesIsFetched: facilitySelectors.getMflFacilitiesFetchStatus(state),
        // mflFacilities: facilitySelectors.getMflFacilities(state),
        resolvedMflFacilities: facilitySelectors.getResolvedMflFacilities(state),
        mflFacilityResolutionIsStarted: facilitySelectors.getMflFacilityResolutionIsStarted(state),
        mflFacilityResolutionIsCompleted: facilitySelectors.getMflFacilityResolutionIsCompleted(state),
        mflFacilityResolutionStatus: facilitySelectors.getMflFacilityResolutionStatus(state),
        mflFacilityResolutionSummary: facilitySelectors.getMflFacilityResolutionSummary(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}
const FacilityResolutionPageConnect = connect(mapStateToProps, mapDispatchToProps)(FacilityResolutionPage)

export default withStyles(styles)(FacilityResolutionPageConnect)