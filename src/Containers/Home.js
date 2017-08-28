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

import Snackbar from "./Snackbar"

import * as authenticationActions from "../Store/Authentication/actions"
import * as authenticationSelectors from "../Store/Authentication/selectors"
import * as orgUnitActions from "../Store/OrgUnits/actions"
import * as orgUnitSelectors from "../Store/OrgUnits/selectors"

import OrgUnitHighlights from "../Components/OrgUnitHighlights"
import OrgUnitItem from "../Components/OrgUnitItem"
import OrgUnitForm from "../Components/OrgUnitForm"
import WardItem from "../Components/WardItem"
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
  });

class Home extends Component {

    componentWillMount(){
        this.props.authenticationActions.mflApiAuth()
    }

    componentDidMount() {
        this.props.orgUnitActions.getCounties(orgLevels.counties)
    }

    //handleChange = (event, index, value) => console.log(event.target.value)

    render(){

        const classes = this.props.classes;
        const bull = <span className={classes.bullet}>•</span>;

        var loader;

        if(this.props.orgUnitLevelFetched===2){
            //console.log("@ 2")
            loader = <OrgUnitHighlights init={this.props.countiesIsFetched} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={false} />
        }else if(this.props.orgUnitLevelFetched===3){
            //console.log("@ 3")
            loader = <OrgUnitHighlights init={false} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={true} />
        }else if(this.props.orgUnitLevelFetched===4){
            //console.log("@ 4")
            loader = <OrgUnitHighlights init={false} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={true} />
        }else if(this.props.orgUnitLevelFetched===5){
            //console.log("@ 5")
            loader = <OrgUnitHighlights init={false} orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={true} />
        }else{
            if(this.props.countiesIsFetched){
                //console.log("@ else 1")
                loader = <OrgUnitHighlights orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={false} init={false} />
            }else{
                //console.log("@ else 2")
                loader = <OrgUnitHighlights orgUnit={this.props.orgUnitSelected} isOrgUnitLoaded={false} init={false} />
            }
        }

        const handleSubmitResolve = (event) => {
            event.preventDefault()
            
            //this.props.orgUnitActions._clearLocalStorage()
            this.props.orgUnitActions.resolveMflFacility(this.props.facilities)
            store.dispatch(push('/resolution'))
        }

        return(
            <div>
                {
                    this.props.isAppAuthenticated ? (
                        <div>
                            <div className={classes.root}>
                                <Typography type="display3" style={{textAlign: "center"}} gutterBottom>
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
                                                        <div style={{marginLeft: "45%"}}>
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
                                                        style={{background:"#276696", color:"#fff", marginTop: -35}} 
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

        facilityResolutionIsCompleted: orgUnitSelectors.getMflFacilityResolutionIsCompleted(state),
        mflFacilityResolutionSummary: orgUnitSelectors.getMflFacilityResolutionSummary(state),

        orgUnitLevelFetched: orgUnitSelectors.getOrgUnitLevelFetched(state),
        orgUnitSelected: orgUnitSelectors.getOrgUnitSelected(state)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authenticationActions: bindActionCreators(authenticationActions, dispatch),
        orgUnitActions: bindActionCreators(orgUnitActions, dispatch)
    }
}

const homePageConnect =  connect(mapStateToProps, mapDispatchToProps,)(Home)

export default withStyles(styles)(homePageConnect)