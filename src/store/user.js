import {makeAutoObservable} from "mobx";
import Auth from "../services/auth";
export default class UserStore{

    constructor() {
        this._user = {}
        this._error = ''
        this._isAuth = false
        makeAutoObservable(this)
    }

    setAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    setError(text){
        this._error = text
    }

    async login(username, password) {

        this.setError('')

        try {
            const response = await Auth.login(username, password)
            sessionStorage.setItem('token', response.data.token)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            this.setError(e.response?.data?.message)
        }
    }

     logout() {
         sessionStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
    }

    async checkAuth(){
        this.setError('')

        try {
            const response = await Auth.checkAuth()
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e){
            this.setError(e.response?.data?.message)
        }
    }

    get isError(){
        return this._error
    }

    get isAuth(){
        return this._isAuth
    }

    get Info(){
        return this._user
    }
}