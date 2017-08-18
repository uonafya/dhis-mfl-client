import * as types from "./actionTypes"
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    facilitiesIsFetched: false,
    facilities: undefined,
    mflFacilitiesIsFetched: false,
    mflFacilities: undefined
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

        default:
            return state
    }
}