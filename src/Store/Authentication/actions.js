import Dhis2Service from "../../Services/Dhis2Service"
import MFLService from "../../Services/MFLService"
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

export function mflApiAuth(){
    return (dispatch, getState) => {
        MFLService.getAuthKey()
            .then(response => {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    mflApiKey: response.key
                })
                console.log(response)
                
                MFLService.getUserInformation()
                .then(response => {
                    dispatch({
                        type: types.MFL_USER_INFORMATION_UPDATED,
                        mflUserInformation: response
                    })
                    console.log(response)
                })
                .catch(error => { 
                    throw(error)
                })
            })
            .catch(error => { 
                throw(error)
            })
    }
}