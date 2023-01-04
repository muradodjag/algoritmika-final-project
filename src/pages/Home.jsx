import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

import '../App.css'

import Search from "../components/Coins/Home/Search";
import Filter from "../components/Coins/Home/Filter";

import {CoinCategories, LIST_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import ArrowSVG from '../assets/img/arrow.svg'

const Home = () => {

    const {main} = useContext(Context)
    const navigate = useNavigate()
    const onSearch = () => {
        navigate(LIST_ROUTE)
    }

    const goLogin = () => {
        navigate(LOGIN_ROUTE)
    }

    const showByCategory = (id) => {
        main.setFilterByField(CoinCategories.find(Obj => Obj.id == id)?.name, 'category')
        navigate(LIST_ROUTE)
    }

    return (
        <div>
            <header>
                <div className="container">
                    <div className="flex">
                        <h1 className="pr10">Homepage</h1>
                        <h1 className="pr10">|</h1>
                        <button
                            className="subtitle"
                            onClick={goLogin}
                        >
                            <h1>Login</h1>
                        </button>
                    </div>
                    <Search main={main} onClick={onSearch}/>
                </div>
                <Filter/>
            </header>
            <section>
                <div className="container">
                    <div className="coins_content_type">
                        {CoinCategories.map((Item => {
                            return (
                                <div key={Item.id} className="coins_type">
                                    <h2 className="coins_type_name">{Item.name}</h2>
                                    <button
                                        className="subtitle"
                                        onClick={() => {
                                            showByCategory(Item.id)
                                        }}
                                    >
                                        <div className="subtitle_text">Show all</div>
                                        <div className="arrow_right">
                                            <img src={ArrowSVG} alt="arrow"/>
                                        </div>
                                    </button>
                                    <div className="coins_type_img">
                                        <img src={Item.src}/>
                                    </div>
                                </div>
                            )
                        }))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;