export default class MFLService {

    static get host() {
        delete MFLService.host
        return MFLService.host = 'https://api.kmhfltest.health.go.ke'
    }

    static get credentials(){
        delete MFLService.credentials
        const credentials = {
            "username": "test@gmail.com",
            "password": "test@1234",
            "grantType": "password",
            "clientId": "aL1Z6K2OiXs3XnSTdxYPu2WnwoqtnZFj1pxiV9fZ",
            "clientSecret": "qikoDzqHqzyC2b00AkR0l48jcolx4sbJNj4ZwbECzIAxaJXYz6OygMR7NNMgeVx0Dr6vDEaxUxHav3thipDH5YKHudFH87xMkkm4HD98krivDYRPllHeSuLgtMwFygX3"
        }
        return MFLService.credentials = credentials
    }

    static getAccesToken(){
        const url = this.host+"/o/token/?"
                            +"grant_type="+this.credentials.grantType
                            +"&username="+this.credentials.username
                            +"&password="+this.credentials.password

        const request = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Basic "+btoa(this.credentials.clientId+":"+this.credentials.clientSecret)
            }),
            json: true
        }

        return fetch(url, request)
        .then(response => {            
            if (response.status != 200) {

            }
            return response.json()
        })
        .catch(error => {
            return error
        })
    }

    static refreshToken(){
        const accesToken = JSON.parse(sessionStorage.getItem("mflAccessToken"))
        const url = this.host+"/o/token/?"
                           +"grant_type=refresh_token"
                           +"&refresh_token="+accesToken.refresh_token
                           +"&client_id="+this.credentials.clientId
                           +"&client_secret="+this.credentials.clientSecret

        const request = {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
            json: true
        }

        return fetch(url, request)
        .then(response => {            
            if (response.status != 200) {

            }
            return response.json()
        })
        .catch(error => {
            return error
        })
    }

    static getOrgUnits(mflCodes){
        const accesToken = JSON.parse(sessionStorage.getItem("mflAccessToken"))
        const url = this.host+"/api/facilities/facilities/?code="+mflCodes

        const request = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+accesToken.access_token
            }),
            json: true
        }

        return fetch(url, request)
        .then(response => {            
            if (response.status != 200) {

            }
            return response.json()
        })
        .catch(error => {
            return error
        })
    }

    /**
     * 
     * @param {*} orgUnitMeta = {
     *                              type: "getByName" or "getByCode" or "getByNameAndCode".
     *                              endPoint: "name=[name]" or "code=[code]" or "name=[name]&code=[code]"
     *                          }
     */
    static getOrgUnit(orgUnitMeta){
        const accesToken = JSON.parse(sessionStorage.getItem("mflAccessToken"))
        const url = this.host+"/api/facilities/facilities/?"+orgUnitMeta.endPoint

        const request = {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer "+accesToken.access_token
            }),
            json: true
        }

        return fetch(url, request)
        .then(response => {            
            if (response.status != 200) {

            }
            return response.json()
        })
        .catch(error => {
            return error
        })
    }
}