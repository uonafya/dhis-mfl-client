import * as types from "./actionTypes"
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    facilitiesIsFetched: false,
    facilities: undefined
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
        default:
            return state
    }
}