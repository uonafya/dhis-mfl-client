import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { push } from 'react-router-redux'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

import FacilityResolutionDetailsCard from "../Components/FacilityResolutionDetailsCard"


import Snackbar from "./Snackbar"

import * as authenticationActions from "../Store/Authentication/actions"
import * as authenticationSelectors from "../Store/Authentication/selectors"
import * as orgUnitActions from "../Store/OrgUnits/actions"
import * as orgUnitSelectors from "../Store/OrgUnits/selectors"

import OrgUnitHighlights from "../Components/OrgUnitHighlights"
import OrgUnitForm from "../Components/OrgUnitForm"
import { orgLevels } from "../Store/OrgUnits/actions"

import store from "../Store/configureStore"

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: "30px auto auto auto",
        maxWidth: 1200
    },
    card: {
        minWidth: 275,
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
    elonSelect: {
        width: "70%",
        height: 50,
        fontSize: "120%",
        border: "none",
        borderBottom: "solid 1px",
        outline: 0,
        marginBottom: 50
    },
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },

    root1: {
        flexGrow: 1,
        margin: "30px auto auto auto",
        maxWidth: 1200
    },
    root2: {
        margin: "auto auto 20px auto",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
});

class Home extends Component {

    componentWillMount() {
        this.props.authenticationActions.mflApiAuth()
    }

    componentDidMount() {
        this.props.orgUnitActions.getCounties(orgLevels.counties)
    }

    //handleChange = (event, index, value) => console.log(event.target.value)

    render() {

        ///from resolution page
        const classes = this.props.classes
        const bull = <span className={classes.bullet}>•</span>;
        const colorRed = "#C62828";
        const colorGreen = "#2E7D32";
        const colorAmber = "#EF6C00";



        var loader;

        if (this.props.orgUnitLevelFetched === 2) {
            console.log("@ 2")
            loader = <OrgUnitHighlights init={this.props.countiesIsFetched} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={false} />
        } else if (this.props.orgUnitLevelFetched === 3) {
            console.log("@ 3")
            loader = <OrgUnitHighlights init={this.props.constituenciesIsFetched} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={true} />
        } else if (this.props.orgUnitLevelFetched === 4) {
            console.log("@ 4")
            loader = <OrgUnitHighlights init={this.props.wardsIsFetched} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={true} />
        } else if (this.props.orgUnitLevelFetched === 5) {
            console.log("@ 5")
            loader = <OrgUnitHighlights init={this.props.facilitiesIsFetched} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={true} />
        } else {
            if (this.props.countiesIsFetched) {
                console.log("@ else 1")
                loader = <OrgUnitHighlights orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={false} init={false} />
            } else {
                console.log("@ else 2")
                loader = <OrgUnitHighlights orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={false} init={false} />
            }
            // console.log("@ else 0")

            // loader = <OrgUnitHighlights orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={false} init={false} />
        }

        const handleSubmitResolve = (event) => {
            event.preventDefault()
            this.props.orgUnitActions.localStorageCls()
            this.props.orgUnitActions.resolveMflFacility(this.props.facilities)
            store.dispatch(push('/resolution'))
        }

        return (
            <div id="allcontainer">
                <div>
                    {
                        this.props.isAppAuthenticated ? (
                            <div>
                                <div className={classes.root}>
                                    <Typography type="display3" style={{ textAlign: "center" }} gutterBottom>
                                        Organization Unit Resolution
                                </Typography>
                                    <Grid container spacing={40}>
                                        <Grid item xs={12} sm={6}>
                                            <Card className={classes.card}>
                                                <CardContent>
                                                    <Typography type="body1" className={classes.title}>
                                                        Organization Unit Selection
                                                </Typography>
                                                    {
                                                        this.props.countiesIsFetched ? (
                                                            <OrgUnitForm
                                                                counties={this.props.counties}
                                                                countiesIsFetched={this.props.countiesIsFetched}
                                                                constituenciesIsFetched={this.props.constituenciesIsFetched}
                                                                constituencies={this.props.constituencies}
                                                                getConstituencies={this.props.orgUnitActions.getConstituencies}
                                                                getWards={this.props.orgUnitActions.getWards}
                                                                getFacilities={this.props.orgUnitActions.getFacilities}
                                                                wards={this.props.wards}
                                                                wardsIsFetched={this.props.wardsIsFetched}
                                                                getOrgUnit={this.props.orgUnitActions.getOrgUnit}
                                                                resetOrgUnitTypeFetched={this.props.orgUnitActions.resetOrgUnitTypeFetched} />
                                                        ) : (
                                                                <div style={{ marginLeft: "45%" }}>
                                                                    <CircularProgress className={classes.progress} size={50} />
                                                                </div>
                                                            )
                                                    }
                                                </CardContent>
                                                <CardActions>
                                                    {
                                                        this.props.facilitiesIsFetched ? (
                                                            <Button
                                                                raised
                                                                style={{ background: "#276696", color: "#fff", marginTop: -35 }}
                                                                className={classes.button}
                                                                onClick={handleSubmitResolve.bind(this)}>
                                                                Resolve Organization Units
                                                    </Button>
                                                        ) : (<span />)
                                                    }
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        {loader}
                                    </Grid>
                                </div>

                            </div>
                        ) : (
                                <Snackbar />
                            )
                    }
                </div>

                {
                    this.props.mflFacilityResolutionIsCompleted ? (
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
                    ) : (
                        <div></div>
                    )
                    
                }
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        // userInformation : authenticationSelectors.getUserInformation(state)
        // mflAuthKey: authenticationSelectors.getAuthKey(state),
        // mflUserInformation: authenticationSelectors.getMflUserInformation(state)
        isAppAuthenticated: authenticationSelectors.isAppAuthenticated(state),
        orgUnitsIsFetched: orgUnitSelectors.getorgUnitsFetchStatus(state),
        orgUnits: orgUnitSelectors.getOrgUnits(state),

        countiesIsFetched: orgUnitSelectors.getCountyFetchStatus(state),
        counties: orgUnitSelectors.getCounties(state),

        constituenciesIsFetched: orgUnitSelectors.getConstituencyFetchStatus(state),
        constituencies: orgUnitSelectors.getConstituencies(state),

        wardsIsFetched: orgUnitSelectors.getWardsFetchedStatus(state),
        wards: orgUnitSelectors.getWards(state),

        facilitiesIsFetched: orgUnitSelectors.getFacilityFetchStatus(state),
        facilities: orgUnitSelectors.getFacilities(state),

        // facilityResolutionIsCompleted: orgUnitSelectors.getMflFacilityResolutionIsCompleted(state),
        mflFacilityResolutionSummary: orgUnitSelectors.getMflFacilityResolutionSummary(state),

        orgUnitLevelFetched: orgUnitSelectors.getOrgUnitLevelFetched(state),
        orgUnitSelected: orgUnitSelectors.getOrgUnitSelected(state),




        resolvedMflFacilities: orgUnitSelectors.getResolvedMflFacilities(state),
        mflFacilityResolutionIsStarted: orgUnitSelectors.getMflFacilityResolutionIsStarted(state),
        mflFacilityResolutionIsCompleted: orgUnitSelectors.getMflFacilityResolutionIsCompleted(state),
        mflFacilityResolutionStatus: orgUnitSelectors.getMflFacilityResolutionStatus(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authenticationActions: bindActionCreators(authenticationActions, dispatch),
        orgUnitActions: bindActionCreators(orgUnitActions, dispatch)
    }
}

const homePageConnect = connect(mapStateToProps, mapDispatchToProps, )(Home)

export default withStyles(styles)(homePageConnect)