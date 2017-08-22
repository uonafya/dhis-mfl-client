import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const initialState = Immutable({
    userInformation: undefined,
    mflApiKey: undefined,
    mflUserInformation: undefined,
    isMflUserAuthenticated: false,
    snackbarMessage: undefined,
    openSnackbar: false
})

export default function authenticationReducer(state=initialState, action={}){
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return state.merge({
                userInformation: action.userInformation
            })
            break;

        case types.MFL_LOGIN_SUCCESS:
            return state.merge({
                isMflUserAuthenticated: action.isMflUserAuthenticated,
            })

        case types.MFL_LOGIN_ERROR:
            return state.merge({
                isMflUserAuthenticated: action.isMflUserAuthenticated,
                snackbarMessage: action.snackbarMessage,
                openSnackbar: action.openSnackbar
            })

        case types.MFL_USER_DETAILS_UPDATED:
            return state.merge({
                mflUserInformation: action.mflUserInformation
            })
    
        default:
            return state
    }
}