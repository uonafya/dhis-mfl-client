import Dhis2Service from "../../Services/Dhis2Service"
import * as types from "./actionTypes"

export function logIn(credentials) {
    return function (dispatch, getState) {
        
        Dhis2Service.getUserInformation(credentials)
            .then(response => {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    userInformation: response.userInformation 
                })
            })
            .catch(error => { 
                throw(error)
            })
    }
}