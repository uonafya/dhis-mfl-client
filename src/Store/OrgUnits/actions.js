import * as types from "./actionTypes"
import Dhis2Service from "../../Services/Dhis2Service"
import MFLService from "../../Services/MFLService"

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

        console.log("@Get MFL Facilities:", mflCodes)

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

    var initialEntry = localStorage.getItem("initialEntry")

    if(initialEntry!==1){
        localStorage.setObject("orgUnitsMetaObjectArray", orgUnitsMeta)
        localStorage.setItem("orgUnitsMetaObjectArrayCount", orgUnitsMeta.length)
        
        if(initialEntry!==1){localStorage.setItem("orgUnitsMetaIterratorCursorPos", 0)}

        localStorage.setItem("initialEntry", 1)

        const fn = (dispatch, getState) => {
            dispatch({
                type: types.MFL_FACILITY_RESOLUTION_STARTED
            })
        }

        fn
        console.log("@ Resolve Facility Action", localStorage.getObject("orgUnitsMetaObjectArray"))
    }

    var orgUnitsMetaIterratorCursorPos = localStorage.getItem("orgUnitsMetaIterratorCursorPos")
    var dhis2FacilityName = orgUnitsMeta[orgUnitsMetaIterratorCursorPos].dhis2Name
    var dhis2FacilityCode = orgUnitsMeta[orgUnitsMetaIterratorCursorPos].dhis2Code

    var orgUnitMeta = {
        type: "getByNameAndCode",
        endPoint: "name="+dhis2FacilityName+"&code="+dhis2FacilityCode
    }

    MFLService.getOrgUnit(orgUnitMeta)
        .then(response => {
            if(response.count > 1){

                orgUnitMeta = {
                    type: "getByName",
                    endPoint: "name="+dhis2FacilityName
                }

                MFLService.getOrgUnit(orgUnitMeta)
                    .then(response => {
                        if(response.count > 1){

                            orgUnitMeta = {
                                type: "getByCode",
                                endPoint: "code="+dhis2FacilityCode
                            }

                            MFLService.getOrgUnit(orgUnitMeta)
                                .then(response => {
                                    if(response.count === 1){
                                        localStorage.getObject("orgUnitsMetaObjectArray")
                                        [localStorage.getItem("orgUnitsMetaIterratorCursorPos")]
                                            .push(name,{didResolve:0})
                                            .push(code,{didResolve:1,meta:{mflCode:response.code}})
                        
                                            if(localStorage.getItem("orgUnitsMetaIterratorCursorPos")
                                                < localStorage.getItem("orgUnitsMetaObjectArrayCount")){
                            
                                                    localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                                    localStorage.getItem("orgUnitsMetaIterratorCursorPos")+1) 
                            
                                                    resolveMflFacility(localStorage.getObject("orgUnitsMetaObjectArray"))
                                            }else{
                            
                                                var toEvans = localStorage.getObject("orgUnitsMetaObjectArray")
                            
                                                localStorage.setItem("initialEntry", 0)
                                                return (dispatch, getState) => {
                                                    dispatch({
                                                        type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                                        resolvedMflFacilities: toEvans
                                                    })
                                                }
                                            }
                                    }else{

                                        localStorage.getObject("orgUnitsMetaObjectArray")
                                        [localStorage.getItem("orgUnitsMetaIterratorCursorPos")]
                                            .push(name,{didResolve:0}).push(code,{didResolve:0})
                        
                                        if(localStorage.getItem("orgUnitsMetaIterratorCursorPos")
                                            < localStorage.getItem("orgUnitsMetaObjectArrayCount")){
                        
                                                localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                                localStorage.getItem("orgUnitsMetaIterratorCursorPos")+1) 
                        
                                                resolveMflFacility(localStorage.getObject("orgUnitsMetaObjectArray"))
                                        }else{
                        
                                            var toEvans = localStorage.getObject("orgUnitsMetaObjectArray")
                        
                                            localStorage.setItem("initialEntry", 0)
                                            return (dispatch, getState) => {
                                                dispatch({
                                                    type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                                    resolvedMflFacilities: toEvans
                                                })
                                            }
                                        }
                                    }
                                })
                                .catch(error => {
                                    throw(error)
                                })

                        }else if(response.count === 1){
                            localStorage.getObject("orgUnitsMetaObjectArray")
                            [localStorage.getItem("orgUnitsMetaIterratorCursorPos")]
                                .push(name,{didResolve:1,meta:{mflName:response.name}})
                                .push(code,{didResolve:0})
            
                                if(localStorage.getItem("orgUnitsMetaIterratorCursorPos")
                                    < localStorage.getItem("orgUnitsMetaObjectArrayCount")){
                
                                        localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                        localStorage.getItem("orgUnitsMetaIterratorCursorPos")+1) 
                
                                        resolveMflFacility(localStorage.getObject("orgUnitsMetaObjectArray"))
                                }else{
                
                                    var toEvans = localStorage.getObject("orgUnitsMetaObjectArray")
                
                                    localStorage.setItem("initialEntry", 0)
                                    return (dispatch, getState) => {
                                        dispatch({
                                            type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                            resolvedMflFacilities: toEvans
                                        })
                                    }
                                }
                        }else{
                            localStorage.getObject("orgUnitsMetaObjectArray")
                            [localStorage.getItem("orgUnitsMetaIterratorCursorPos")]
                                .push(name,{didResolve:0}).push(code,{didResolve:0})
            
                            if(localStorage.getItem("orgUnitsMetaIterratorCursorPos")
                                < localStorage.getItem("orgUnitsMetaObjectArrayCount")){
            
                                    localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                                    localStorage.getItem("orgUnitsMetaIterratorCursorPos")+1) 
            
                                    resolveMflFacility(localStorage.getObject("orgUnitsMetaObjectArray"))
                            }else{
            
                                var toEvans = localStorage.getObject("orgUnitsMetaObjectArray")
            
                                localStorage.setItem("initialEntry", 0)
                                return (dispatch, getState) => {
                                    dispatch({
                                        type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                        resolvedMflFacilities: toEvans
                                    })
                                }
                            }
                        }
                    })
                    .catch(error => {
                        throw(error)
                    })


            }else if(response.count === 1){

                localStorage.getObject("orgUnitsMetaObjectArray")
                [localStorage.getItem("orgUnitsMetaIterratorCursorPos")]
                    .push(name,{didResolve:1,meta:{mflName:response.name}})
                    .push(code,{didResolve:1,meta:{mflCode:response.code}})

                    if(localStorage.getItem("orgUnitsMetaIterratorCursorPos")
                        < localStorage.getItem("orgUnitsMetaObjectArrayCount")){
    
                            localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                            localStorage.getItem("orgUnitsMetaIterratorCursorPos")+1) 
    
                            resolveMflFacility(localStorage.getObject("orgUnitsMetaObjectArray"))
                    }else{
    
                        var toEvans = localStorage.getObject("orgUnitsMetaObjectArray")
    
                        localStorage.setItem("initialEntry", 0)
                        return (dispatch, getState) => {
                            dispatch({
                                type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                                resolvedMflFacilities: toEvans
                            })
                        }
                    }

            }else{

                localStorage.getObject("orgUnitsMetaObjectArray")
                [localStorage.getItem("orgUnitsMetaIterratorCursorPos")]
                    .push(name,{didResolve:0}).push(code,{didResolve:0})

                if(localStorage.getItem("orgUnitsMetaIterratorCursorPos")
                    < localStorage.getItem("orgUnitsMetaObjectArrayCount")){

                        localStorage.setItem("orgUnitsMetaIterratorCursorPos", 
                        localStorage.getItem("orgUnitsMetaIterratorCursorPos")+1) 

                        resolveMflFacility(localStorage.getObject("orgUnitsMetaObjectArray"))
                }else{

                    var toEvans = localStorage.getObject("orgUnitsMetaObjectArray")

                    localStorage.setItem("initialEntry", 0)
                    return (dispatch, getState) => {
                        dispatch({
                            type: types.MFL_FACILITY_RESOLUTION_COMPLETED,
                            resolvedMflFacilities: toEvans
                        })
                    }
                }
            }
        })
        .catch(error => {
            throw(error)
        })

}