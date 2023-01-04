import {makeAutoObservable} from "mobx";
import {convertToNumStr} from '../utils'
import Coins from "../services/coins";
import {CoinCategories} from "../utils/consts";

export default class MainStore {

    constructor() {
        this._error = ''
        this._filters = {
            search: '',
            priceFilter: {priceFrom: '', priceTo: ''},
            yearFilter: {yearFrom: '', yearTo: ''},
            category: '',
            country: '',
            quality: '',
            metal: '',
            page: 0,
            pageSize: 12
        }
        makeAutoObservable(this)
    }

    async filters() {

        this.setError('')

        try {
            return await Coins.filters()
        } catch (e) {
            this.setError('Getting filter data ended with errors...')
        }
    }

    async getList() {

        this.setError('')

        try {
            return await Coins.getList(this._filters)
        } catch (e) {
            this.setError('Getting coins data ended with errors...')
        }
    }

    async getAdminList() {

        this.setError('')

        try {
            return await Coins.getAdminList(this._filters.search)
        } catch (e) {
            this.setError('Getting coins data ended with errors...')
        }
    }

    async getCoin(id) {

        this.setError('')

        try {
            return await Coins.getCoin(id)
        } catch (e) {
            this.setError('Getting coin data ended with errors...')
        }
    }

    async deleteCoin(id) {

        this.setError('')
        try {
            return await Coins.deleteCoin(id)
        } catch (e) {
            this.setError('Error during deleting operation...')
        }
    }

    async updateCoin(id, coin) {

        this.setError('')
        try {
            await Coins.updateCoin(id, coin)
        } catch (e) {
            this.setError('Error during updating coin info...')
        }
    }

    async newCoin(coin) {

        this.setError('')
        try {
            return await Coins.newCoin(coin)
        } catch (e) {
            this.setError('Error during creating new coin...')
        }
    }


    setError(text) {
        this._error = text
    }

    setPage(num) {
        this._filters = {
            ...this._filters, page: num
        }
    }

    setFilters(filters) {
        this._filters = filters
    }

    setSearch(str) {
        this._filters = {
            ...this._filters, search: str
        }
    }

    setCategory(id) {
        this._filters = {
            ...this._filters, category: id
        }
    }

    setPriceFilter(from, to) {
        this._filters = {
            ...this._filters, priceFilter: {
                priceFrom: convertToNumStr(from),
                priceTo: convertToNumStr(to)
            }
        }
    }

    setYearFilter(from, to) {
        this._filters = {
            ...this._filters, yearFilter: {
                yearFrom: convertToNumStr(from),
                yearTo: convertToNumStr(to)
            }
        }
    }

    setFilterByField(value, fldName) {
        let mValue = ''
        if(fldName === 'category')
        {
            mValue = CoinCategories.find(Obj => Obj.name === value)?.id
        }else{
            mValue = value
        }
        this._filters = {
            ...this._filters, [fldName]: mValue
        }
    }

    get isError() {
        return this._error
    }

    get Filters() {
        return this._filters
    }

    get Search() {
        return this._filters.search
    }

    getCategory() {
        return this._filters.category
    }

    get priceFromFilter() {
        return this._filters.priceFilter.priceFrom
    }

    get priceToFilter() {
        return this._filters.priceFilter.priceTo
    }

    get yearFromFilter() {
        return this._filters.yearFilter.yearFrom
    }

    get yearToFilter() {
        return this._filters.yearFilter.yearTo
    }

    get Page() {
        return this._filters.page
    }

    get PageSize() {
        return this._filters.pageSize
    }

}