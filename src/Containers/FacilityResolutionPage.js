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
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
        margin: "auto auto 20px auto",
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
        //console.log("@CDM", this.props.facilitiesIsFetched)
        if(this.props.facilitiesIsFetched){
            this.props.facilityActions.resolveMflFacility(this.props.facilities)
            //console.log(this.props.facilities)
        }
    }

    render() {
        const classes = this.props.classes
        const bull = <span className={classes.bullet}>•</span>;
        const colorRed = "#C62828"
        const colorGreen = "#2E7D32"
        const colorAmber = "#EF6C00"

        return (
            <div style={{fontFamily: "Arial"}} className={classes.root1}>
                <Typography type="display3" style={{textAlign: "center"}} gutterBottom>
                    {this.props.orgUnitSelected.name} Resolution Report
                </Typography>
                <Grid container spacing={40}>
                     <Grid item xs={12} sm={5}>
                    {this.props.mflFacilityResolutionIsCompleted ? (
                        <Paper className={classes.root} elevation={4} style={{textAlign: "left"}}>
                            <Typography type="headline"gutterBottom>
                                Facility Resolution Summary
                            </Typography>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Name:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedNames}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Code:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedCodes}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Name &amp; Code:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{color: colorGreen}}>
                                            Total Resolved:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes+
                                                                this.props.mflFacilityResolutionSummary.resolvedNames+
                                                                this.props.mflFacilityResolutionSummary.resolvedCodes}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{color: colorRed}}>
                                            Total Unresolved:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.total - (
                                                this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes+
                                                                    this.props.mflFacilityResolutionSummary.resolvedNames+
                                                                    this.props.mflFacilityResolutionSummary.resolvedCodes)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <br />
                            <br />
                            <Typography type="headline"gutterBottom>
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
                </Grid>
                <Grid item xs={12} sm={7}> 
                {
                    this.props.mflFacilityResolutionIsCompleted ? (
                        
                        this.props.resolvedMflFacilities.map((facilityMeta, i) => (
                                <div key={i} className={classes.root2} >
                                    <FacilityResolutionDetailsCard facilityMeta={facilityMeta} />
                                </div>
                            )
                        )
                        
                        ) : (
                            <div style={{textAlign: "center"}}>
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
                </Grid>
                </Grid>
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
        mflFacilityResolutionSummary: facilitySelectors.getMflFacilityResolutionSummary(state),
        orgUnitSelected: facilitySelectors.getOrgUnitSelected(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}
const FacilityResolutionPageConnect = connect(mapStateToProps, mapDispatchToProps)(FacilityResolutionPage)

export default withStyles(styles)(FacilityResolutionPageConnect)