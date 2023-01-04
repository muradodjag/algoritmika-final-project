import $api from "../http";

export default class Auth {

    static login(login, password) {
        return $api.post('/api/admin/signin', {login, password})
    }

    static checkAuth() {
        return $api.get('/api/admin/approve')
    }
}