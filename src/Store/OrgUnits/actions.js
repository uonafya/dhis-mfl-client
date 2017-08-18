import * as types from "./actionTypes"
import Dhis2Service from "../../Services/Dhis2Service"

export const orgLevels = {
    country: 1,
    counties: 2,
    constituencies: 3,
    wards: 4,
    facilities: 5,

}

export function getOrgUnits(level, pageNumber = 1) {
    return function (dispatch, getState) {

        dispatch({ type: types.ORGUNIT_REQUESTED })
        Dhis2Service.getOrgUnits(level, pageNumber)
            .then(orgUnits => {
                //check if page end of page                
                if (orgUnits.pager.page < orgUnits.pager.pageCount) {
                    dispatch(addOrgUnits(orgUnits.organisationUnits))
                    return dispatch(getOrgUnits(level, pageNumber + 1))
                }
                else {
                    return
                }

            })
            .catch(error => {
                throw (error)
            })
    }
}

export function addOrgUnits(orgUnits) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.ADD_ORGUNITS,
            orgUnits
        })
    }
}


export function getFacilities(wardId, pageNumber = 1) {
    return function (dispatch, getState) {
        dispatch({ type: types.FACILITIES_REQUESTED })

        Dhis2Service.getOrgUnitChildren(wardId)
            .then(wardFacilities => {
                dispatch({
                    type: types.FACILITIES_RECEIVED,
                    facilities: wardFacilities.children
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}

export function addFacilities(facilities) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.ADD_FACILITIES,
            facilities
        })
    }
}

export function getCounties(pageNumber = 1) {
    return function (dispatch, getState) {
        dispatch({ type: types.COUNTIES_REQUESTED })
        Dhis2Service.getOrgUnits(2, pageNumber)
            .then(orgUnits => {
                //check if page end of page                
                if (orgUnits.pager.page < orgUnits.pager.pageCount) {
                    dispatch(addCounties(orgUnits.organisationUnits))
                    return dispatch(getOrgUnits(1, pageNumber + 1))
                }
                else {
                    if (orgUnits.pager.page == 1) {
                        dispatch(addCounties(orgUnits.organisationUnits))
                        return dispatch(getOrgUnits(1, pageNumber + 1))
                    }
                    return
                }

            })
            .catch(error => {
                throw (error)
            })
    }
}

export function addCounties(counties) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.ADD_COUNTIES,
            counties
        })
    }
}

export function getConstituencies(countyId) {
    return function (dispatch, getState) {
        Dhis2Service.getOrgUnitChildren(countyId)
            .then(countyConstituencies => {
                dispatch({
                    type: types.CONSTITUENCIES_RECEIVED,
                    constituencies: countyConstituencies.children
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}

export function getWards(constituencyId) {
    return function (dispatch, getState) {
        Dhis2Service.getOrgUnitChildren(constituencyId)
            .then(constituencyWards => {
                dispatch({
                    type: types.WARDS_RECEIVED,
                    wards: constituencyWards.children
                })
            })
            .catch(error => { })
    }
}