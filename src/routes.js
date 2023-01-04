
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    LIST_ROUTE,
    COIN_ROUTE,
    EDIT_ROUTE,
    ADD_NEW_ROUTE,
    ADMIN_LIST_ROUTE
} from "./utils/consts";

import {Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import List from "./pages/List";
import Coin from "./pages/Coin";
import Edit from "./pages/Edit";
import AdminList from "./pages/AdminList";


export const publicRoutes = [
    {path: LOGIN_ROUTE, element:<Login/>},
    {path: HOME_ROUTE, element:<Home/> },
    {path: LIST_ROUTE, element:<List/>},
    {path: COIN_ROUTE + '/:id', element:<Coin/>},
    //Navigating all other routes to home page
    {path: '*', element:<Navigate to='/'/>}
]

export const privateRoutes = [
    //this route navigates authorized user to main page
    {path: ADMIN_LIST_ROUTE, element:<AdminList/>},
    {path: EDIT_ROUTE + '/:id', element:<Edit/>},
    {path: ADD_NEW_ROUTE, element:<Edit/>},
    {path: '*', element:<Navigate to={ADMIN_LIST_ROUTE}/>}
]
