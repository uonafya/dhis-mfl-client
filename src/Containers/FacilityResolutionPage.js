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
    root1: {
        flexGrow: 1,
        margin: "30px auto auto auto",
        maxWidth: 1200
      },
    root2: {
        margin: "50px auto auto auto",
        maxWidth: 650
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
        console.log("@CDM", this.props.facilitiesIsFetched)
        if(this.props.facilitiesIsFetched){
            this.props.facilityActions.resolveMflFacility(this.props.facilities)
            console.log(this.props.facilities)
        }
    }

    render() {
        const classes = this.props.classes
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div style={{fontFamily: "Arial"}} className={classes.root1}>
                <h1 style={{textAlign: "center"}}>Resolution Report</h1>
                <div >
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
                                <div key={i} className={classes.root2} >
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
        facilitiesIsFetched: facilitySelectors.getFacilityFetchStatus(state),
        facilities: facilitySelectors.getFacilities(state),
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