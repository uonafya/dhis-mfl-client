import * as types from "./actionTypes"
import Dhis2Service from "../../Services/Dhis2Service"
import MFLService from "../../Services/MFLService"

export function getFacilities(){
    return function (dispatch, getState){
        var facilityLevel = [5]
        dispatch({ type: types.FACILITIES_REQUESTED })
        
        Dhis2Service.getOrgUnits(facilityLevel)
            .then(facilities => {                
                dispatch({
                    type: types.FACILITIES_RECEIVED,
                    facilities: facilities.organisationUnits
                })
            })
            .catch(error =>{
                throw(error)
            })
    }
}

export function getMflFacilities(mflCodes){
    return (dispatch, getState) => {

        dispatch({
            type: types.MFL_FACILITIES_REQUESTED
        })

        console.log("@Get MFL Facilities:", mflCodes)

        MFLService.getOrgUnits(mflCodes.join())
            .then(response => {
                dispatch({
                    type: types.MFL_FACILITIES_RECEIVED,
                    mflFacilities: response.results
                })
            })
            .catch(error => {
                throw(error)
            })
    }
}