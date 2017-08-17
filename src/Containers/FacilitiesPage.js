import React, { Component } from "react"
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'

import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import * as facilityActions from "../Store/OrgUnits/actions"
import * as facilitySelectors from "../Store/OrgUnits/selectors"


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        background: theme.palette.background.paper,
    },
})


class FacilitiesPage extends Component {

    componentDidMount() {

        this.props.facilityActions.getFacilities()
    }

    render() {
        const classes = this.props.classes
        return (
            <div>
                {
                    this.props.facilitiesIsFetched ? (
                        <List className={classes.root}>
                            {
                                this.props.facilities.map((facility, i) => (

                                    <ListItem button>
                                        <ListItemText primary={facility.name} />
                                    </ListItem>

                                    
                                ))
                            }
                        </List>
                    ) : (
                            <h4>Loading</h4>
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
        facilities: facilitySelectors.getFacilities(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        facilityActions: bindActionCreators(facilityActions, dispatch)
    }
}
const FaciliyPageConnect = connect(mapStateToProps, mapDispatchToProps)(FacilitiesPage)

export default withStyles(styles)(FaciliyPageConnect)