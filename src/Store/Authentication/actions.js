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
        MFLService.getAccesToken()
            .then(response => {
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    isMflUserAuthenticated: true
                })
                sessionStorage.setItem("mflAccessToken", JSON.stringify(response))
            })
            .catch(error => { 
                throw(error)
            })
    }
}

setInterval(() => {
    MFLService.refreshToken()
        .then(response => {
            sessionStorage.setItem("mflAccessToken", JSON.stringify(response))
        })
}, 25000)

export function mflUserDetails(){
    return (dispatch, getState) => {
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
    }
}