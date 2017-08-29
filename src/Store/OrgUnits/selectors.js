export function getFacilitiesFetchStatus(state){
    return state.facilityReducer.facilitiesIsFetched
}

export function getFacilities(state){
    return state.facilityReducer.facilities
}