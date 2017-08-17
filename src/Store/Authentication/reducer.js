import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const initialState = Immutable({
    userInformation: undefined,
    mflApiKey: undefined,
    mflUserInformation: undefined,
    isMflUserAuthenticated: false
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
                mflApiKey: action.mflApiKey,
                isMflUserAuthenticated: true
            })

        case types.MFL_USER_DETAILS_UPDATED:
            return state.merge({
                mflUserInformation: action.mflUserInformation
            })
    
        default:
            return state
    }
}