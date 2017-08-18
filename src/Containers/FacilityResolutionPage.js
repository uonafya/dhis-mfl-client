import React, { Component } from "react"
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import FacilityResolutionDetailsCard from "../Components/FacilityResolutionDetailsCard"

import * as facilityActions from "../Store/OrgUnits/actions"
import * as facilitySelectors from "../Store/OrgUnits/selectors"


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.background.paper,
    },
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
      },
})


class FacilityResolutionPage extends Component {

    componentDidMount() {

        //this.props.facilityActions.getFacilities()
        this.props.facilityActions.resolveMflFacility(
            [
                {
                    id: "FTVmVryLXiE",
                    dhis2Name: "Chematich",
                    dhis2Code: "23053"
                },
                {
                    id: "Smgomyf1mXV",
                    dhis2Name: "Besiobei",
                    dhis2Code: "23007"
                },
                {
                    id: "LgEtXZGfmKk",
                    dhis2Name: "kapkoma",
                    dhis2Code: "23006"
                },
                {
                    id: "Smgomyf1mXV",
                    dhis2Name: "Amani Dispensary",
                    dhis2Code: "23004"
                },
                {
                    id: "LgEtXZGfmKk",
                    dhis2Name: "huruma testhuruma test",
                    dhis2Code: "23003"
                },
            ])
        //console.log("@Facilities Page:", this.props.mflFacilities, this.props.mflFacilitiesIsFetched)
    }

    render() {
        const classes = this.props.classes

        return (
            <div style={{fontFamily: "Arial"}}>
                <h1 style={{textAlign: "center"}}>Resolving DHIS2-MFL Facilities</h1>
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
                                            <h3>Loading Facilities from MFL...</h3>
                                            <p>MFL-DHIS2 Resolution started... Realtime status updates coming soon!</p>
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
        mflFacilityResolutionIsCompleted: facilitySelectors.getMflFacilityResolutionIsCompleted(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}
const FacilityResolutionPageConnect = connect(mapStateToProps, mapDispatchToProps)(FacilityResolutionPage)

export default withStyles(styles)(FacilityResolutionPageConnect)