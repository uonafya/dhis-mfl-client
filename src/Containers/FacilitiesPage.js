import React, { Component } from "react"
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import FacilityDetailsCard from "../Components/FacilityDetailsCard"

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


class FacilitiesPage extends Component {

    componentDidMount() {

        //this.props.facilityActions.getFacilities()
        this.props.facilityActions.getMflFacilities([23053,23007,23006,23004,23003,23002,23001,22999,22997,15719])
        //console.log("@Facilities Page:", this.props.mflFacilities, this.props.mflFacilitiesIsFetched)
    }

    render() {
        const classes = this.props.classes

        return (
            <div style={{fontFamily: "Arial"}}>
                <h1 style={{textAlign: "center"}}>Requested MFL Facilities</h1>
                {
                    this.props.mflFacilitiesIsFetched ? (
                        this.props.mflFacilities.map((facility, i) => (
                                <div key={i} style={{margin: "50px", marginRight: "35%"}} >
                                    <FacilityDetailsCard facility={facility} />
                                </div>
                            )
                        )
                        ) : (
                            <div style={{marginTop: "10%", textAlign: "center"}}>
                                <CircularProgress className={classes.progress} size={50} />
                                <br />
                                <h3>Loading Facilities from MFL...</h3>
                            </div>
                        )
                }
            </div>
        )
    }
}

FacilitiesPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        facilitiesIsFetched: facilitySelectors.getFacilitiesFetchStatus(state),
        facilities: facilitySelectors.getFacilities(state),
        mflFacilitiesIsFetched: facilitySelectors.getMflFacilitiesFetchStatus(state),
        mflFacilities: facilitySelectors.getMflFacilities(state),
        // resolvedMflFacilities: facilitySelectors.getResolvedMflFacilities(state),
        // mflFacilityResolutionIsStarted: facilitySelectors.getMflFacilityResolutionIsStarted(state),
        // mflFacilityResolutionIsCompleted: facilitySelectors.getMflFacilityResolutionIsCompleted(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}
const FaciliyPageConnect = connect(mapStateToProps, mapDispatchToProps)(FacilitiesPage)

export default withStyles(styles)(FaciliyPageConnect)