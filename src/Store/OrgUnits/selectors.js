export function getorgUnitsFetchStatus(state){
    return state.facilityReducer.orgUnitsIsFetched
}

export function getOrgUnits(state){
    return state.facilityReducer.orgUnits
}

export function getFacilityFetchStatus(state){
    return state.facilityReducer.facilitiesIsFetched
}

export function getFacilities(state){
    return state.facilityReducer.facilities
}


export function getCountyFetchStatus(state){
    return state.facilityReducer.countiesIsFetched
}

export function getCounties(state){
    return state.facilityReducer.counties
}

export function getConstituencyFetchStatus(state){
    return state.facilityReducer.constituenciesIsFetched
}

export function getConstituencies(state){
    return state.facilityReducer.constituencies
}