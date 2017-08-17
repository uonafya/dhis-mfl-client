import * as types from "./actionTypes"
import Dhis2Service from "../../Services/Dhis2Service"

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