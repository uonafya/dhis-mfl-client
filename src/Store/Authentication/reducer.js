import * as types from "./actionTypes"
import Immutable from "seamless-immutable"

const initialState = Immutable({
    userInformation: undefined
})

export default function authenticationReducer(state=initialState, action={}){
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return state.merge({
                userInformation
            })
            break;
    
        default:
            return state
    }
}