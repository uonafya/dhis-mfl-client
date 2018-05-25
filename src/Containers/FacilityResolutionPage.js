import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from "material-ui/Button"

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import FacilityResolutionDetailsCard from "../Components/FacilityResolutionDetailsCard"
import FacilityResolutionTable from "../Components/FacilityResolutionTable"

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
    button: {
        margin: theme.spacing.unit,
    },
})

class FacilityResolutionPage extends Component {

    componentDidMount() {        
    }



    render() {
        const classes = this.props.classes
        const bull = <span className={classes.bullet}>•</span>;
        const colorRed = "#C62828"
        const colorGreen = "#2E7D32"
        const colorAmber = "#EF6C00"


        if (this.props.facilitiesIsFetched) {
            return (
                <div style={{ fontFamily: "Arial" }} className={classes.root1}>
                    <Typography type="display3" style={{ textAlign: "center" }} gutterBottom>
                        {this.props.orgUnitSelected.name} Resolution Report
                            </Typography>
                    <Grid container spacing={40}>
                        <Grid item xs={12} sm={5}>
                            {this.props.mflFacilityResolutionIsCompleted ? (
                                <Paper className={classes.root} elevation={4} style={{ textAlign: "left" }}>
                                    <Typography type="headline" gutterBottom>
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
                                                <TableCell style={{ color: colorGreen }}>
                                                    Total Resolved:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes +
                                                        this.props.mflFacilityResolutionSummary.resolvedNames +
                                                        this.props.mflFacilityResolutionSummary.resolvedCodes}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ color: colorRed }}>
                                                    Total Unresolved:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.total - (
                                                        this.props.mflFacilityResolutionSummary.resolvedNamesAndCodes +
                                                        this.props.mflFacilityResolutionSummary.resolvedNames +
                                                        this.props.mflFacilityResolutionSummary.resolvedCodes)}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <br />
                                    <br />
                                    <Typography type="headline" gutterBottom>
                                        TOTAL:&nbsp;&nbsp;{this.props.mflFacilityResolutionSummary.total}
                                    </Typography>
                                    <Typography type="body1" style={{ marginTop: -20 }} className={classes.pos}>
                                        <span style={{ fontStyle: "italic", fontSize: "90%", color: "#000000" }}>Disclaimer! This information is based on DHIS2 & KMHFL data</span>
                                    </Typography>
                                    <Button raised color="primary" className={classes.button}
                                        onClick={() => { this.props.facilityActions.createExcel(this.props.resolvedMflFacilities, (this.props.orgUnitSelected.name + ' resolution') ) }} >
                                        Download as excel
                                            </Button>
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
                                    <div>
                                        <FacilityResolutionTable data={this.props.resolvedMflFacilities} />                                        
                                    </div>
                                ) : (
                                        <div style={{ textAlign: "center" }}>
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
        else {            
            return (
                <Redirect to="/" />
            )
        }
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