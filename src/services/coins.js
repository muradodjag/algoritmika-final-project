import $api from "../http";
import {CoinFilters} from "../utils/consts";

export default class Coins {

    static async filters(mainStore){
        let response =  await $api.get('/api/filter/info')
        return response.data;
    }

    static async getList(filters){

        let mParams = {}
        CoinFilters.forEach(Item =>{
            mParams[Item.id] = filters[Item.id]
        })

        let response =  await $api.get('/api/filter', {
            params: {
                ...mParams,
                search: filters.search,
                priceFrom: filters.priceFilter.priceFrom,
                priceTo: filters.priceFilter.priceTo,
                yearFrom: filters.yearFilter.yearFrom,
                yearTo: filters.yearFilter.yearTo,
                page: filters.page,
                pageSize: filters.pageSize
            }
        })
            return response.data;

    }

    static async getAdminList(name){

        let response =  await $api.get('/api/admin/search', {
            params: {
                name}
        })
        return response.data;

    }

    static async getCoin(id){

        let response =  await $api.get('/api/coin/' + id)
        return response.data;

    }

    static async deleteCoin(id){

        let response =  await $api.delete('/api/admin/coin/' + id)
        return Boolean(response.data?.result);

    }

    static async updateCoin(id, coinData){

        await $api.put('/api/admin/coin/' + id,
            coinData)

    }

    static async newCoin(coinData){

        await $api.post('/api/admin/coin/', coinData)

    }


}