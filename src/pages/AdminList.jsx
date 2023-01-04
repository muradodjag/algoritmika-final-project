import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Search from "../components/Coins/Home/Search";
import Loader from "../components/Utils/Loader";
import Snackbar from "../components/Utils/Snackbar";
import '../App.css'
import {ADD_NEW_ROUTE, EDIT_ROUTE} from "../utils/consts";


const AdminList = () => {

    const {main, user} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const [list, setList] = useState([])
    const navigate = useNavigate()

    const closeSnackbar = () => {
        setShowMessage(false)
    }

    const newCoin = () => {
        navigate(ADD_NEW_ROUTE)
    }

    const editCoin = (id) => {
        navigate(EDIT_ROUTE + '/' + id)
    }

    const logout = ()=>{
        user.logout()
    }

    const updateList = async () => {

        const mList = await main.getAdminList()
        setIsLoading(false)
        if (main.isError) {
            setShowMessage(true)
            return
        }
        setList(mList)
    }

    const deleteCoin = async (id) => {

        const result = await main.deleteCoin(id)
        if (main.isError) {
            setShowMessage(true)
            return
        }
        if (result) {
            updateList()
        }
    }

    useEffect(() => {

        updateList().catch(console.error)
        main.setError('')

    }, [])

    if (isLoading) return (<Loader/>)

    return (
        <div>
            <Snackbar
                show={showMessage}
                message={main.isError}
                closeSnackbar={closeSnackbar}
            />
            <header>
                <div className="container">
                    <div className="flex">
                        <h1 className="pr10">Admin panel</h1>
                        <h1 className="pr10">|</h1>
                        <button
                            className="subtitle"
                            onClick={logout}
                        >
                            <h1>Logout</h1>
                        </button>
                    </div>
                </div>
                <Search main={main} onClick={updateList}/>
            </header>
            <section>
                <div className="coins_wrapper">
                    <div className="coin_edit">
                        <div className="coin_edit_add">
                            <div className="coin_edit_plus_first"></div>
                            <div className="coin_edit_plus_second"></div>
                        </div>
                        <a
                            className="coin_edit_link"
                            href="#"
                            onClick={e => {
                                e.preventDefault()
                                newCoin()
                            }
                            }
                        >Add a new coin</a>
                    </div>
                    {
                        list.map(Item => {
                            return (
                                <div key={Item.id} className="coin_edit">
                                    <div className="coin_edit_img"><img
                                        src={Item.obverseImageLink}
                                        alt="obverse"/>
                                    </div>
                                    <div className="coin_edit_info">
                                        <div className="coin_name coin_edit_title">{Item.name}</div>
                                        <div className="coin_descr coin_edit_descr">
                                            {Item.shortDescription}
                                        </div>
                                    </div>
                                    <button
                                        className="button coin_edit_btn edit"
                                        onClick={() => {
                                            editCoin(Item.id)
                                        }}
                                    >Edit</button>
                                    <button
                                        className="button coin_edit_btn delete"
                                        onClick={() => {
                                            deleteCoin(Item.id)
                                        }}
                                    >Delete
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    );
};

export default observer(AdminList);