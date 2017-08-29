import * as types from "./actionTypes"
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    orgUnitsIsFetched: false,
    orgUnits: [],

    facilitiesIsFetched: false,
    facilities: [],

    countiesIsFetched: false,
    counties: [],

    constituenciesIsFetched: false,
    constituencies: undefined,

    wardsIsFetched: false,
    wards: undefined,

    facilities: undefined,
    mflFacilitiesIsFetched: false,
    mflFacilities: undefined,
    mflFacilityResolutionIsStarted: false,
    mflFacilityResolutionStatus: undefined,
    resolvedMflFacilities: undefined,
    mflFacilityResolutionSummary: undefined,
    mflFacilityResolutionIsCompleted: false,

    orgUnitLevelFetched: 0,
    orgUnitSelected: undefined
})

export default function facilityReducer(state = initialState, action = {}) {
    switch (action.type) {
        case types.ORGUNIT_REQUESTED:
            return state.merge({
                orgUnitSelected: action.orgUnit
            })

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

        case types.COUNTIES_REQUESTED:
            return state

        case types.ADD_COUNTIES:
            return state.merge({
                counties: [...state.counties, ...action.counties],
                countiesIsFetched: true,
                orgUnitLevelFetched: 2
            })

        case types.CONSTITUENCIES_REQUESTED:
            return state

        case types.CONSTITUENCIES_RECEIVED:
            return state.merge({
                constituencies: action.constituencies,
                constituenciesIsFetched: true,
                orgUnitLevelFetched: 3
            })

        case types.WARDS_REQUESTED:
            return state

        case types.WARDS_RECEIVED:
            return state.merge({
                wards: action.wards,
                wardsIsFetched: true,
                orgUnitLevelFetched: 4
            })

        case types.ADD_FACILITIES:
            return state.merge({
                facilities: [...state.facilities, ...action.facilities],
                facilitiesIsFetched: true,
                orgUnitLevelFetched: 5
            })

        case types.FACILITIES_REQUESTED:
            return state

        case types.FACILITIES_RECEIVED:
            return state.merge({
                facilities: action.facilities,
                facilitiesIsFetched: true,
                orgUnitLevelFetched: 5
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
            //console.log("@ Reducer Bruh!")
            return state.merge({
                mflFacilityResolutionIsCompleted: true,
                mflFacilityResolutionIsStarted: false,
                resolvedMflFacilities: action.resolvedMflFacilities,
                mflFacilityResolutionSummary: action.mflFacilityResolutionSummary
            })

        case types.RESET_ORGUNIT_TYPE_RETRIEVED:
            return state.merge({
                orgUnitLevelFetched: 0
            })

        default:
            return state
    }
}