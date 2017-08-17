export default class MFLService {
    static get host() {
        delete MFLService.host
        return MFLService.host = 'http://api.kmhfltest.health.go.ke'
    }

    static get sessionAuth(){
        delete MFLService.sessionAuth
        const parsedCredentials = {
            "username": "dennisbanga@gmail.com",
            "password": "healthit123"
        }
        return MFLService.sessionAuth = parsedCredentials
    }

    static getAuthKey(){
        const url = this.host+"/api/rest-auth/login/"
        
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Vary": "Accept",
                "Accept": "application/json",
            },
            body: {
                body: this.sessionAuth
            }
        }

        return fetch(url, request)
        .then(response => {
            console.log(response)
            if (response.status != 200) {

            }
            return response.json()
        })
        .catch(error => {
            return error
        })
    }

    static getUserInformation(){
        const url = this.host+"/api/rest-auth/user/"

        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Vary": "Accept",
                "Accept": "application/json",
                "Access-Control-Allow-Headers": "Content-Type, Vary, Accept"
            },
        }

        return fetch(url, request)
        .then(response => {
            console.log(response)
            if (response.status != 200) {

            }
            return response.json()
        })
        .catch(error => {
            return error
        })
    }
}