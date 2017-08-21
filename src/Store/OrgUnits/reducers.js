import * as types from "./actionTypes"
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    facilitiesIsFetched: false,
    facilities: undefined,
    mflFacilitiesIsFetched: false,
    mflFacilities: undefined,
    mflFacilityResolutionIsStarted: false,
    mflFacilityResolutionStatus: undefined,
    resolvedMflFacilities: undefined,
    mflFacilityResolutionSummary: undefined,
    mflFacilityResolutionIsCompleted: false
})

export default function facilityReducer(state=initialState, action={}){
    switch (action.type) {
        case types.FACILITIES_REQUESTED:
            return state
    
        case types.FACILITIES_RECEIVED:
            return state.merge({
                facilities: action.facilities,
                facilitiesIsFetched: true
            })

        case types.MFL_FACILITIES_REQUESTED:
            return state

        case types.MFL_FACILITIES_RECEIVED:
            return state.merge({
                mflFacilitiesIsFetched: true,
                mflFacilities: action.mflFacilities,
            })

        case types.MFL_FACILITY_RESOLUTION_STARTED:
            return state.merge({
                mflFacilityResolutionIsStarted: true
            })

        case types.MFL_FACILITY_RESOLUTION_STATUS:
            return state.merge({
                mflFacilityResolutionStatus: action.mflFacilityResolutionStatus
            })

        case types.MFL_FACILITY_RESOLUTION_COMPLETED:
            console.log("@ Reducer Bruh!")
            return state.merge({
                mflFacilityResolutionIsCompleted: true,
                mflFacilityResolutionIsStarted: false,
                resolvedMflFacilities: action.resolvedMflFacilities,
                mflFacilityResolutionSummary: action.mflFacilityResolutionSummary
            })

        default:
            return state
    }
}