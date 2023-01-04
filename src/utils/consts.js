import BullionPNG from "../assets/img/bullion.png";
import ExclusivePNG from "../assets/img/exclusive.png";
import CommemorativePNG from "../assets/img/commemorative.png";

//ROUTES LINKING
export const LOGIN_ROUTE = '/login'
export const HOME_ROUTE = '/'
export const LIST_ROUTE = '/list'
export const ADMIN_LIST_ROUTE = '/admin/list'
export const COIN_ROUTE = '/coin'
export const EDIT_ROUTE = '/coin/edit'
export const ADD_NEW_ROUTE = '/coin/new'

//COIN CATEGORIES
export const CoinCategories = [
    {id: '1', name: 'Bullion coins', src: BullionPNG},
    {id: '2', name: 'Exclusive coins', src: ExclusivePNG},
    {id: '3', name: 'Commemorative coins', src: CommemorativePNG}
]

//COIN FILTERS
export const CoinFilters = [
    {id: 'country', name: 'country', label: 'Issuing country'},
    {id: 'metal', name: 'metal', label: 'Metal'},
    {id: 'quality', name: 'quality', label: 'Quality of the coin'},
    {id: 'category', name: 'category', label: 'Category'}
]

