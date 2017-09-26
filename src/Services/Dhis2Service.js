export default class Dhis2Service {
    static get host() {
        delete Dhis2Service.host
        return Dhis2Service.host = 'http://test.hiskenya.org/api/26/'
    }

    static get basicAuth() {
        delete Dhis2Service.basicAuth
        const parsedCredentials = 'healthit:hEALTHIT2017'
        const encodedCredentials = btoa(parsedCredentials)
        return Dhis2Service.basicAuth = encodedCredentials
    }

    static getUserInformation(credentials) {
        const url = 'http://test.hiskenya.org/api/26/me'
        const parsedCredentials = credentials.username + ':' + credentials.password
        const encodedCredentials = btoa(parsedCredentials)

        const request = {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + encodedCredentials
            },
        }


        return fetch(url, request)
            .then(response => {
                //console.log(response)
                if (response.status != 200) {

                }
                return response.json()
            })
            .catch(error => {
                return error
            })
    }

    static getNewToken(credentials) {

    }


    static getOrgUnits(levels = [], pageNumber) {
        let levelsText = '[' + levels + ']'
        const url = this.host.concat('organisationUnits.json?fields=id,name,level,code,coordinates&filter=level:in:' + levelsText + '&paging=true&page=' + pageNumber)
        const request = {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + this.basicAuth
            },
        }

        return fetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }

    static getOrgUnit(id) {
        const url = this.host.concat('organisationUnits/'+id+'.json')
        const request = {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + this.basicAuth
            },
        }

        return fetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })
    }


    static getOrgUnitChildren(orgUnitId) {
        const url = this.host.concat('organisationUnits/' + orgUnitId + '?fields=children[id,name,code,coordinates]&paging=true&page=1')
        const request = {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + this.basicAuth
            },
        }

        return fetch(url, request)
            .then(response => {
                return response.json()
            })
            .catch(error => {
                throw (error)
            })

    }

}