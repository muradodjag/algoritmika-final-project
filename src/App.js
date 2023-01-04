import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./index";
import {useBeforeUnload} from "./hooks";

//Importing components
import AppRouter from "./components/Router";
import Loader from "./components/Utils/Loader";

function App() {

    const {user} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)

    useBeforeUnload(e => {
        e.preventDefault()
        e.returnValue = ''
    });

    useEffect(() => {

        const setAuth = async () => {
            if (sessionStorage.getItem('token')) {
                await user.checkAuth()
                setIsLoading(false)
            } else setIsLoading(false)
        }

        setAuth().catch(console.error)

    }, [user])

    if (isLoading) {
        return (
            <BrowserRouter>
                <Loader/>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;

