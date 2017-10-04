import * as types from "./actionTypes"
import Dhis2Service from "../../Services/Dhis2Service"
import MFLService from "../../Services/MFLService"
import store from "../configureStore"



export const orgLevels = {
    country: 1,
    counties: 2,
    constituencies: 3,
    wards: 4,
    facilities: 5,

}

export function getOrgUnits(level, pageNumber = 1) {
    return function (dispatch, getState) {

        dispatch({ type: types.ORGUNIT_REQUESTED })
        Dhis2Service.getOrgUnits(level, pageNumber)
            .then(orgUnits => {
                //check if page end of page                
                if (orgUnits.pager.page < orgUnits.pager.pageCount) {
                    dispatch(addOrgUnits(orgUnits.organisationUnits))
                    return dispatch(getOrgUnits(level, pageNumber + 1))
                }
                else {
                    return
                }

            })
            .catch(error => {
                throw (error)
            })
    }
}

export function addOrgUnits(orgUnits) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.ADD_ORGUNITS,
            orgUnits
        })
    }
}

export function getOrgUnit(id) {
    return function (dispatch, getState) {
        Dhis2Service.getOrgUnit(id)
            .then(orgUnit => {
                //console.log("@GET ORG UNIT", orgUnit)
                dispatch({
                    type: types.ORGUNIT_REQUESTED,
                    orgUnit: orgUnit
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}


export function getFacilities(wardId, pageNumber = 1) {
    return function (dispatch, getState) {
        dispatch({ type: types.FACILITIES_REQUESTED })

        Dhis2Service.getOrgUnitChildren(wardId)
            .then(wardFacilities => {
                dispatch({
                    type: types.FACILITIES_RECEIVED,
                    facilities: wardFacilities.children
                })
                //console.log("@Get Facilities", wardFacilities)
                //resolveMflFacility(wardFacilities.children)

            })
            .catch(error => {
                throw (error)
            })
    }
}

export function addFacilities(facilities) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.ADD_FACILITIES,
            facilities
        })
    }
}

export function getCounties(pageNumber = 1) {
    return function (dispatch, getState) {
        dispatch({ type: types.COUNTIES_REQUESTED })
        Dhis2Service.getOrgUnits(2, pageNumber)
            .then(orgUnits => {
                //console.log(orgUnits)
                //check if page end of page                
                if (orgUnits.pager.page < orgUnits.pager.pageCount) {
                    dispatch(addCounties(orgUnits.organisationUnits))
                    return dispatch(getOrgUnits(1, pageNumber + 1))
                }
                else {
                    if (orgUnits.pager.page == 1) {
                        dispatch(addCounties(orgUnits.organisationUnits))
                        return dispatch(getOrgUnits(1, pageNumber + 1))
                    }
                    return
                }

            })
            .catch(error => {
                throw (error)
            })
    }
}

export function addCounties(counties) {
    return function (dispatch, getState) {
        return dispatch({
            type: types.ADD_COUNTIES,
            counties
        })
    }
}

export function getConstituencies(countyId) {
    return function (dispatch, getState) {
        Dhis2Service.getOrgUnitChildren(countyId)
            .then(countyConstituencies => {
                dispatch({
                    type: types.CONSTITUENCIES_RECEIVED,
                    constituencies: countyConstituencies.children
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}

export function getWards(constituencyId) {
    return function (dispatch, getState) {
        Dhis2Service.getOrgUnitChildren(constituencyId)
            .then(constituencyWards => {
                //console.log("@Get Wards", constituencyWards)
                dispatch({
                    type: types.WARDS_RECEIVED,
                    wards: constituencyWards.children
                })
            })
            .catch(error => { })
    }
}

export function resetOrgUnitTypeFetched() {
    return function (dispatch, getState) {
        dispatch({
            type: types.RESET_ORGUNIT_TYPE_RETRIEVED
        })
    }
}

export function getMflFacilities(mflCodes) {
    return function (dispatch, getState) {

        dispatch({
            type: types.MFL_FACILITIES_REQUESTED
        })

        //console.log("@Get MFL Facilities:", mflCodes)

        MFLService.getOrgUnits(mflCodes.join())
            .then(response => {
                dispatch({
                    type: types.MFL_FACILITIES_RECEIVED,
                    mflFacilities: response.results
                })
            })
            .catch(error => {
                throw (error)
            })
    }
}
5
export function createExcel(resolutionData) {
    return function (dispatch, getState){
        let data = []
        resolutionData.map((instance, i) => {
            data.push({
                orgunit: 'name',
                DHIS2: instance.name.meta.dhis2Name,
                KMHFL: instance.name.meta.mflName
            })
            data.push({
                orgunit: 'code',
                DHIS2: instance.code.meta.dhis2Code,
                KMHFL: instance.code.meta.mflCode
            })
            data.push({
                orgunit: 'coordinates',
                DHIS2: instance.code.meta.dhis2Coordinates,
                KMHFL: instance.code.meta.mflCoordinates
            })
            data.push({
                orgunit: '',
                DHIS2:'',
                KMHFL: ''
            })
        })

        console.log(data)
        var opts = [{ sheetid: 'Resolution', header: true }];
        var res = alasql('SELECT * INTO XLSX("resolution.xlsx",?) FROM ?',
            [opts, [data]]);


        
    }
}

export function resolveMflFacility(orgUnitsMeta) {

    //clearLocalStorage()

    var initialEntry = parseInt(localStorage.getItem("initialEntry") || 0)

    if (initialEntry !== 1) {
        var results = []
        setObject("resolutionResults", results)
        setObject("orgUnitsMetaObjectArray", orgUnitsMeta)
        localStorage.setItem("orgUnitsMetaObjectArrayCount", orgUnitsMeta.length)
        localStorage.setItem("resolvedNamesAndCodes", 0)
        localStorage.setItem("resolvedNames", 0)
        localStorage.setItem("resolvedCodes", 0)
        localStorage.setItem("orgUnitsMetaIterratorCursorPos", 0)
        localStorage.setItem("initialEntry", 1)

    }

    store.dispatch({
        type: types.MFL_FACILITY_RESOLUTION_STATUS,
        mflFacilityResolutionStatus: "Resolving facility " +
        (parseInt(localStorage.getItem('orgUnitsMetaIterratorCursorPos')) + 1) +
        " of " +
        parseInt(localStorage.getItem('orgUnitsMetaObjectArrayCount'))
    })

    var orgUnitsMetaIterratorCursorPos = parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))
    var dhis2FacilityName = (orgUnitsMeta[orgUnitsMetaIterratorCursorPos].name || '0')
    var dhis2FacilityCode = (orgUnitsMeta[orgUnitsMetaIterratorCursorPos].code || 0)

    var orgUnitMeta = {
        type: "getByNameAndCode",
        endPoint: "name=" + dhis2FacilityName + "&code=" + dhis2FacilityCode
    }


    MFLService.getOrgUnit(orgUnitMeta)
        .then(response => {

            if (response.count !== 1) {

                orgUnitMeta = {
                    type: "getByName",
                    endPoint: "name=" + dhis2FacilityName
                }

                MFLService.getOrgUnit(orgUnitMeta)
                    .then(response => {
                        if (response.count !== 1) {

                            orgUnitMeta = {
                                type: "getByCode",
                                endPoint: "code=" + dhis2FacilityCode
                            }

                            MFLService.getOrgUnit(orgUnitMeta)
                                .then(response => {
                                    if (response.count === 1) {

                                        incrementResolvedItem("resolvedCodes")
                                        updateResolutionResults(0, 1, response)
                                        prepareForDispatch()

                                    } else {
                                        updateResolutionResults(0, 0, response)
                                        prepareForDispatch()
                                    }
                                })
                                .catch(error => {
                                    throw (error)
                                })

                        } else if (response.count === 1) {

                            incrementResolvedItem("resolvedNames")
                            updateResolutionResults(1, 0, response)
                            prepareForDispatch()

                        } else {
                            updateResolutionResults(0, 0, response)
                            prepareForDispatch()
                        }
                    })
                    .catch(error => {
                        throw (error)
                    })


            } else if (response.count === 1) {

                incrementResolvedItem("resolvedNamesAndCodes")
                updateResolutionResults(1, 1, response)
                prepareForDispatch()

            } else {
                updateResolutionResults(0, 0, response)
                prepareForDispatch()
            }
        })
        .catch(error => {
            throw (error)
        })

    return (dispatch, getState) => {
        dispatch({
            type: types.MFL_FACILITY_RESOLUTION_STARTED
        })
    }
}

var setObject = (k, v) => { localStorage.setItem(k, JSON.stringify(v)) }
var getObject = (k) => { return JSON.parse(localStorage.getItem(k) || "[]") }
var clearLocalStorage = () => {
    localStorage.clear();
}

export function localStorageCls() {
    return (dispatch, getState) => {
        console.log("Hey")
        clearLocalStorage()
    }
}

var updateResolutionResults = (n, c, r) => {
    var oldObj = getObject("resolutionResults")
    var update = {
        "id": (getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].id || 0),
        "name": {
            "didResolve": n,
            "meta": {
                "dhis2Name": (getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].name || '0'),
                "dhis2Coordinates": (getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].coordinates || '0'),
                "mflName": (n > 0 || c > 0 ? r.results[0].name : "Not Resolved"),
                "mflCoordinates": (c > 0 || n > 0 ? (r.results[0].lat_long[0] + ',' + r.results[0].lat_long[1]) : "Not Resolved"),
            }
        },
        "code": {
            "didResolve": c,
            "meta": {
                "dhis2Code": (getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].code || 0),
                "dhis2Coordinates": (getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].coordinates || '0'),
                "mflCode": (c > 0 || n > 0 ? r.results[0].code : "Not Resolved"),
                "mflCoordinates": (c > 0 || n > 0 ? (r.results[0].lat_long[0] + ',' + r.results[0].lat_long[1]) : "Not Resolved"),
            }
        }
    }

    oldObj.push(update)
    setObject("resolutionResults", oldObj)
    //console.log(getObject("resolutionResults"), "responseObj", response)
}

var prepareForDispatch = () => {
    if ((parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos")) + 1)
        < parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))) {
        localStorage.setItem("orgUnitsMetaIterratorCursorPos",
            parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos")) + 1)
        //console.log("@ Resolve Facility Action - Count === 1 > ",localStorage.getItem("orgUnitsMetaIterratorCursorPos"))                            
        resolveMflFacility(getObject("orgUnitsMetaObjectArray"))
    } else {
        var toEvans = getObject("resolutionResults")
        var stats = {
            "resolvedNamesAndCodes": parseInt(localStorage.getItem("resolvedNamesAndCodes")),
            "resolvedNames": parseInt(localStorage.getItem("resolvedNames")),
            "resolvedCodes": parseInt(localStorage.getItem("resolvedCodes")),
            "total": parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))
        }
        //console.log("To EVans Obj",toEvans)
        //clearLocalStorage()
        store.dispatch({
            type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
            resolvedMflFacilities: toEvans,
            mflFacilityResolutionSummary: stats

        })
    }
}

var incrementResolvedItem = (item) => {
    localStorage.setItem(item,
        parseInt(localStorage.getItem(item)) + 1)
}

