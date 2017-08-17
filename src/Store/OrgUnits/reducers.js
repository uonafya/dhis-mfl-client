import * as types from "./actionTypes"
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    orgUnitsIsFetched: false,
    orgUnits: [],

    facilitiesIsFetched: false,
    facilities: [],

    countiesIsFetched: false,
    counties: [],

})

export default function facilityReducer(state=initialState, action={}){
    switch (action.type) {
        case types.ORGUNIT_REQUESTED:
            return state
    
        case types.ORGUNIT_RECEIVED:
            return state.merge({
                orgUnits: action.orgUnits,
                orgUnitsIsFetched: true
            })
        
        case types.ADD_ORGUNITS:            
            return state.merge({
                orgUnits: [...state.orgUnits, ...action.orgUnits],
                orgUnitsIsFetched: true
            })
        
        case types.ADD_FACILITIES:
            return state.merge({
                facilities: [...state.facilities, ...action.facilities],
                facilitiesIsFetched: true
            })
        
        case types.COUNTIES_REQUESTED:
            return state
        
        case types.COUNTIES_RECEIVED:
            return state.merge({
                counties: [...state.counties, ...action.counties],
                countiesIsFetched: true
            })
        default:
            return state
    }
}