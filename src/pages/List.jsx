import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import Search from "../components/Coins/Home/Search";
import Filter from "../components/Coins/Home/Filter";
import Snackbar from "../components/Utils/Snackbar";
import {COIN_ROUTE, HOME_ROUTE} from "../utils/consts";
import Loader from "../components/Utils/Loader";

const List = () => {

    const {main} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const [pageAmount, setPageAmount] = useState(0)
    const [list, setList] = useState([])
    const navigate = useNavigate()

    const closeSnackbar = () => {
        setShowMessage(false)
    }

    const goHomepage = () => {
        navigate(HOME_ROUTE)
    }

    const goCoinPage = (id) => {
        navigate(COIN_ROUTE + '/' + id)
    }

    const changePage = (i) => {
        main.setPage(i - 1)
        updateList()
    }

    const updateList = async () => {

        const mList = await main.getList()
        setIsLoading(false)
        if (main.isError) {
            setShowMessage(true)
            return
        }
        setList(mList.coins)
        let pgAmount = Math.ceil(mList.count / main.PageSize)
        setPageAmount(pgAmount)
    }

    useEffect(() => {

        updateList().catch(console.error)
        main.setError('')

    }, [])

    if(isLoading) return (<Loader/>)

    return (
        <div>
            <Snackbar
                show={showMessage}
                message={main.isError}
                closeSnackbar={closeSnackbar}
            />
            <header>
                <div className="container">
                    <h1>List of the coins</h1>
                    <div className="subhead">
                        <a
                            href="#"
                            onClick={
                                e => {
                                    e.preventDefault()
                                    goHomepage()
                                }
                            }>Homepage</a> — List of the coins
                    </div>
                    <Search main={main} onClick={updateList}/>
                    <Filter/>
                </div>
            </header>
            <section>
                <div className="container">
                    <div className="coins_content">
                        {list.map((Coin => {
                            return (
                                <div key={Coin.id} className="coins">
                                    <div className="coin_img">
                                        <img
                                            src={Coin.obverseImageLink}
                                            className="coins_type_img"
                                        />
                                    </div>
                                    <div className="coin_text">
                                        <h2>
                                            <a
                                                href="#"
                                                className="coin_name"
                                                onClick={e => {
                                                    e.preventDefault()
                                                    goCoinPage(Coin.id)
                                                }
                                                }
                                            >{Coin.name}</a
                                            >
                                        </h2>
                                        <div className="coin_descr">
                                            {Coin.shortDescription}
                                        </div>
                                    </div>
                                </div>
                            )
                        }))}
                    </div>
                </div>
            </section>
            <footer>
                <div className="nav">
                    {(() => {
                        let td = [];
                        for (let i = 1; i <= pageAmount; i++) {
                            td.push(
                                <a
                                    key={i}
                                    href="#"
                                    className={main.Page + 1 == i ? "nav_click activePage" : "nav_click"}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        changePage(i)
                                    }
                                    }
                                >{i}</a>
                            );
                        }
                        return td;
                    })()}
                </div>
            </footer>
        </div>
    );
};

export default List;