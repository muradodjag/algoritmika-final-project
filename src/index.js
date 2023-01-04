import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from "./store/user";
import MainStore from "./store/main";
import App from "./App";

export const Context = createContext(null)

const mainStore = new MainStore();
const userStore = new UserStore();

const root = ReactDOM.createRoot(
    document.getElementById('root')
)

root.render(
    <Context.Provider value={{
        user: userStore,
        main: mainStore
    }}>
        <App/>
    </Context.Provider>,

);