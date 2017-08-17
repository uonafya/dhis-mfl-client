export default class MFLService {
    static get host() {
        delete MFLService.host
        return MFLService.host = 'http://api.kmhfltest.health.go.ke/api/rest-auth/login/'
    }
}