import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import facilityReducer from "./OrgUnits/reducers"

const rootReducer = combineReducers({
    facilityReducer,
    router: routerReducer
})

export default rootReducer