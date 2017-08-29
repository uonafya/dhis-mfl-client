export function getorgUnitsFetchStatus(state) {
    return state.facilityReducer.orgUnitsIsFetched
}

export function getOrgUnits(state) {
    return state.facilityReducer.orgUnits
}

export function getCountyFetchStatus(state) {
    return state.facilityReducer.countiesIsFetched
}

export function getCounties(state) {
    return state.facilityReducer.counties
}

export function getConstituencyFetchStatus(state) {
    return state.facilityReducer.constituenciesIsFetched
}

export function getConstituencies(state) {
    return state.facilityReducer.constituencies
}

export function getWardsFetchedStatus(state) {
    return state.facilityReducer.wardsIsFetched
}

export function getWards(state) {
    return state.facilityReducer.wards
}

export function getFacilityFetchStatus(state) {
    return state.facilityReducer.facilitiesIsFetched
}

export function getFacilities(state) {
    return state.facilityReducer.facilities
}

export function getMflFacilitiesFetchStatus(state){
    //console.log("@ Get MFL Facility Fetshced Status", state.facilityReducer.mflFacilitiesIsFetched)
    return state.facilityReducer.mflFacilitiesIsFetched
}

export function getMflFacilities(state){
    //console.log("@ Get MFL Facilities", state.facilityReducer.mflFacilities)
    return state.facilityReducer.mflFacilities
}

export function getMflFacilityDetails(state, mflCode){

    var facilities = state.facilityReducer.mflFacilities

    // returns => [{ "name": "john", "dinner": "sushi" }]
    facilities.filter((facility) => { 
        return facility.code === mflCode 
    });

    return [{"name": "default"}]
}

export function getResolvedMflFacilities(state){
    return state.facilityReducer.resolvedMflFacilities
}

export function getMflFacilityResolutionIsStarted(state){
    return state.facilityReducer.mflFacilityResolutionIsStarted
}

export function getMflFacilityResolutionIsCompleted(state){
    return state.facilityReducer.mflFacilityResolutionIsCompleted
}

export function getMflFacilityResolutionStatus(state){
    return state.facilityReducer.mflFacilityResolutionStatus
}

export function getMflFacilityResolutionSummary(state){
    return state.facilityReducer.mflFacilityResolutionSummary
}

export function getOrgUnitLevelFetched(state){
    return state.facilityReducer.orgUnitLevelFetched
}

export function getOrgUnitSelected(state){
    return state.facilityReducer.orgUnitSelected
}