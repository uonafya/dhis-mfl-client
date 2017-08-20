import * as types from "./actionTypes"
import Dhis2Service from "../../Services/Dhis2Service"
import MFLService from "../../Services/MFLService"
import store from "../configureStore"

export function getFacilities(){
    return function (dispatch, getState){
        var facilityLevel = [5]
        dispatch({ type: types.FACILITIES_REQUESTED })
        
        Dhis2Service.getOrgUnits(facilityLevel)
            .then(facilities => {                
                dispatch({
                    type: types.FACILITIES_RECEIVED,
                    facilities: facilities.organisationUnits
                })
            })
            .catch(error =>{
                throw(error)
            })
    }
}

export function getMflFacilities(mflCodes){
    return (dispatch, getState) => {

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
                throw(error)
            })
    }
}

export function resolveMflFacility(orgUnitsMeta){

    //clearLocalStorage()

    var initialEntry = parseInt(localStorage.getItem("initialEntry")||0)

    if(initialEntry!==1){
        var results = []
        setObject("resolutionResults", results)
        setObject("orgUnitsMetaObjectArray", orgUnitsMeta)
        localStorage.setItem("orgUnitsMetaObjectArrayCount", orgUnitsMeta.length)
        
        if(initialEntry!==1){localStorage.setItem("orgUnitsMetaIterratorCursorPos", 0)}

        localStorage.setItem("initialEntry", 1)
    }

    store.dispatch({
        type: types.MFL_FACILITY_RESOLUTION_STATUS,
        mflFacilityResolutionStatus: "Resolving facility "+
                                    (parseInt(localStorage.getItem('orgUnitsMetaIterratorCursorPos'))+1)+
                                    " of "+
                                    parseInt(localStorage.getItem('orgUnitsMetaObjectArrayCount'))
    })

    var orgUnitsMetaIterratorCursorPos = parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))
    var dhis2FacilityName = orgUnitsMeta[orgUnitsMetaIterratorCursorPos].dhis2Name
    var dhis2FacilityCode = orgUnitsMeta[orgUnitsMetaIterratorCursorPos].dhis2Code    

    var orgUnitMeta = {
        type: "getByNameAndCode",
        endPoint: "name="+dhis2FacilityName+"&code="+dhis2FacilityCode
    }


    MFLService.getOrgUnit(orgUnitMeta)
        .then(response => {
            
            if(response.count !== 1){

                orgUnitMeta = {
                    type: "getByName",
                    endPoint: "name="+dhis2FacilityName
                }

                MFLService.getOrgUnit(orgUnitMeta)
                    .then(response => {
                        if(response.count !== 1){

                            orgUnitMeta = {
                                type: "getByCode",
                                endPoint: "code="+dhis2FacilityCode
                            }

                            MFLService.getOrgUnit(orgUnitMeta)
                                .then(response => {
                                    if(response.count === 1){

                                        var oldObj = getObject("resolutionResults")
                                        var update = {
                                                        "id": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].id,
                                                        "name":{
                                                            "didResolve": 0,
                                                            "meta": {
                                                                "dhis2Name": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Name,
                                                                "mflName": response.results[0].name
                                                            }
                                                        },
                                                        "code": {
                                                            "didResolve": 1,
                                                            "meta": {
                                                                "dhis2Code": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Code,
                                                                "mflCode": response.results[0].code
                                                            }
                                                        }
                                                    }
                                                    
                                        oldObj.push(update)
                                        setObject("resolutionResults", oldObj)
                                        //console.log(getObject("resolutionResults"), "responseObj", response)
                        
                                            if((parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1)
                                                < parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))){
                            
                                                    localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                                    parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1) 
                        
                                                    //console.log("@ Resolve Facility Action - Count === 1 > ",localStorage.getItem("orgUnitsMetaIterratorCursorPos"))                            
                            
                                                    resolveMflFacility(getObject("orgUnitsMetaObjectArray"))
                                            }else{
                            
                                                var toEvans = getObject("resolutionResults")
                            
                                                clearLocalStorage()
                                                
                                                store.dispatch({
                                                    type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                                    resolvedMflFacilities: toEvans
                                                })
                                            }
                                    }else{

                                        var oldObj = getObject("resolutionResults")
                                        var update = {
                                                        "id": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].id,
                                                        "name":{
                                                            "didResolve": 0,
                                                            "meta": {
                                                                "dhis2Name": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Name,
                                                                "mflName": "Not Resolved"
                                                            }
                                                        },
                                                        "code": {
                                                            "didResolve": 0,
                                                            "meta": {
                                                                "dhis2Code": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Code,
                                                                "mflCode": "Not Resolved"
                                                            }
                                                        }
                                                    }
                                                    
                                        oldObj.push(update)
                                        setObject("resolutionResults", oldObj)
                        
                                        if((parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1)
                                            < parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))){
                        
                                                localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                                parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1) 
                        
                                                resolveMflFacility(getObject("orgUnitsMetaObjectArray"))
                                        }else{
                        
                                            var toEvans = getObject("resolutionResults")
                                            
                                            clearLocalStorage()
                                            
                                            store.dispatch({
                                                type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                                resolvedMflFacilities: toEvans
                                            })
                                        }
                                    }
                                })
                                .catch(error => {
                                    throw(error)
                                })

                        }else if(response.count === 1){

                            var oldObj = getObject("resolutionResults")
                            var update = {
                                            "id": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].id,
                                            "name":{
                                                "didResolve": 1,
                                                "meta": {
                                                    "dhis2Name": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Name,
                                                    "mflName": response.results[0].name
                                                }
                                            },
                                            "code": {
                                                "didResolve": 0,
                                                "meta": {
                                                    "dhis2Code": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Code,
                                                    "mflCode": response.results[0].code
                                                }
                                            }
                                        }
                                        
                            oldObj.push(update)
                            setObject("resolutionResults", oldObj)
                            //console.log(getObject("resolutionResults"), "responseObj", response)
            
                                if((parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1)
                                    < parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))){
                
                                        localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                        parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1) 
            
                                        //console.log("@ Resolve Facility Action - Count === 1 > ",localStorage.getItem("orgUnitsMetaIterratorCursorPos"))                            
                
                                        resolveMflFacility(getObject("orgUnitsMetaObjectArray"))
                                }else{
                
                                    var toEvans = getObject("resolutionResults")
                
                                    clearLocalStorage()
                                    
                                    store.dispatch({
                                        type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                        resolvedMflFacilities: toEvans
                                    })
                                }
                        }else{

                            var oldObj = getObject("resolutionResults")
                            var update = {
                                            "id": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].id,
                                            "name":{
                                                "didResolve": 0,
                                                "meta": {
                                                    "dhis2Name": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Name,
                                                    "mflName": "Not Resolved"
                                                }
                                            },
                                            "code": {
                                                "didResolve": 0,
                                                "meta": {
                                                    "dhis2Code": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Code,
                                                    "mflCode": "Not Resolved"
                                                }
                                            }
                                        }
                                        
                            oldObj.push(update)
                            setObject("resolutionResults", oldObj)
            
                            if((parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1)
                                < parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))){
            
                                    localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                    parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1) 
            
                                    resolveMflFacility(getObject("orgUnitsMetaObjectArray"))
                            }else{
            
                                var toEvans = getObject("resolutionResults")
                                
                                clearLocalStorage()
                                
                                store.dispatch({
                                    type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                    resolvedMflFacilities: toEvans
                                })
                            }
                        }
                    })
                    .catch(error => {
                        throw(error)
                    })


            }else if(response.count === 1){
                
                var oldObj = getObject("resolutionResults")
                var update = {
                                "id": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].id,
                                "name":{
                                    "didResolve": 1,
                                    "meta": {
                                        "dhis2Name": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Name,
                                        "mflName": response.results[0].name
                                    }
                                },
                                "code": {
                                    "didResolve": 1,
                                    "meta": {
                                        "dhis2Code": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Code,
                                        "mflCode": response.results[0].code
                                    }
                                }
                            }
                            
                oldObj.push(update)
                setObject("resolutionResults", oldObj)
                //console.log(getObject("resolutionResults"), "responseObj", response)

                    if((parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1)
                        < parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))){
    
                            localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                            parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1) 

                            //console.log("@ Resolve Facility Action - Count === 1 > ",localStorage.getItem("orgUnitsMetaIterratorCursorPos"))                            
    
                            resolveMflFacility(getObject("orgUnitsMetaObjectArray"))
                    }else{
    
                        var toEvans = getObject("resolutionResults")

                        //console.log("To EVans Obj",toEvans)
    
                        clearLocalStorage()
                        
                        store.dispatch({
                            type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                            resolvedMflFacilities: toEvans
                        })
                    }

            }else{
                
                var oldObj = getObject("resolutionResults")
                var update = {
                                "id": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].id,
                                "name":{
                                    "didResolve": 0,
                                    "meta": {
                                        "dhis2Name": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Name,
                                        "mflName": "Not Resolved"
                                    }
                                },
                                "code": {
                                    "didResolve": 0,
                                    "meta": {
                                        "dhis2Code": getObject("orgUnitsMetaObjectArray")[parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))].dhis2Code,
                                        "mflCode": "Not Resolved"
                                    }
                                }
                            }
                            
                oldObj.push(update)
                setObject("resolutionResults", oldObj)

                if((parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1)
                    < parseInt(localStorage.getItem("orgUnitsMetaObjectArrayCount"))){

                        localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                        parseInt(localStorage.getItem("orgUnitsMetaIterratorCursorPos"))+1) 

                        resolveMflFacility(getObject("orgUnitsMetaObjectArray"))
                }else{

                    var toEvans = getObject("resolutionResults")
                    
                    clearLocalStorage()
                    
                    store.dispatch({
                        type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                        resolvedMflFacilities: toEvans
                    })
                }
            }
        })
        .catch(error => {
            throw(error)
        })

        return (dispatch, getState) => {
            dispatch({
                type: types.MFL_FACILITY_RESOLUTION_STARTED
            })
        }
}

var setObject = (k,v) => {localStorage.setItem(k, JSON.stringify(v))}
var getObject = (k) => {return JSON.parse(localStorage.getItem(k) || "[]")}
var clearLocalStorage = () => {
    var accessToken = localStorage.getItem('mflAccessToken');
    localStorage.clear();
    localStorage.setItem('mflAccessToken',accessToken);
}