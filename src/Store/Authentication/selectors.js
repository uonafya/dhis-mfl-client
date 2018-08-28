export function getUserInformation(state){
    return state.authenticationReducer.userInformation
}

export function getAuthKey(state){
    return state.authenticationReducer.mflApiKey
}

export function getMflUserInformation(state){
    if(state.isMflUserAuthenticated){
        return state.authenticationReducer.mflUserInformation
    }
    return {
        "user": "default"
    }
}

export function getSnackbarMessage(state) {
    return state.authenticationReducer.snackbarMessage
}

export function isAppAuthenticated(state){
    return state.authenticationReducer.isMflUserAuthenticated
}

export function getSnackbarMode(state){
    return state.authenticationReducer.openSnackbar
}