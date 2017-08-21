import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import facilityReducer from "./OrgUnits/reducers"
import authenticationReducer from "./Authentication/reducer"

const rootReducer = combineReducers({
    facilityReducer,
    authenticationReducer,
    router: routerReducer
})

export default rootReducer