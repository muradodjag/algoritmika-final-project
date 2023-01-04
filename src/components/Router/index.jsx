import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../../routes";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Index = () => {

    const {user} = useContext(Context)

    return (
            <Routes>
                {user.isAuth && privateRoutes.map(({path, element}) =>
                    <Route  key={path} path={path} element={element}/>
                )}
                {!user.isAuth && publicRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>
                )}
            </Routes>
    )
};

export default observer(Index);