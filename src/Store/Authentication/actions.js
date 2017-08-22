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

                if(response.hasOwnProperty("access_token") && 
                    response.hasOwnProperty("refresh_token")){
                        dispatch({
                            type: types.MFL_LOGIN_SUCCESS,
                            isMflUserAuthenticated: true
                        })
                        //console.log("Auth Success")
                        sessionStorage.setItem("mflAccessToken", JSON.stringify(response))
                    }else{
                        dispatch({
                            type: types.MFL_LOGIN_ERROR,
                            isMflUserAuthenticated: false
                        })
                    }
                
            })
            .catch(error => { 
                throw(error)
            })
    }
}

setInterval(() => {
    if(localStorage.hasOwnProperty("mflAccessToken")){
        MFLService.refreshToken()
        .then(response => {
            sessionStorage.setItem("mflAccessToken", JSON.stringify(response))
        })
    }
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