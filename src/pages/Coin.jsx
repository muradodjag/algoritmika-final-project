import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import Snackbar from "../components/Utils/Snackbar";
import Loader from "../components/Utils/Loader";
import {LIST_ROUTE} from "../utils/consts";
import Error404 from "../components/Utils/Error404";

const Coin = () => {

    const {main} = useContext(Context)
    const [card, setCard] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    const goList = () => {
        navigate(LIST_ROUTE)
    }
    const closeSnackbar = () => {
        setShowMessage(false)
    }
    const updateCard = async () => {

        const mCard = await main.getCoin(params.id)
        setIsLoading(false)
        if (main.isError) {
            setShowMessage(true)
            return
        }
        setCard(mCard[0])
    }

    useEffect(() => {
        updateCard().catch(console.error)
        main.setError('')

    }, [])

    if(isLoading) return (<Loader/>)

    if(!card && !isLoading){
        return (<Error404/>)
    }

    return (
        <div className="container">
            <Snackbar
                show={showMessage}
                message={main.isError}
                closeSnackbar={closeSnackbar}
            />
            <div className="coin">
                <div className="coin_pics">
                    <div className="coin_image coin_img_front">
                        <img src={card.obverseImageLink}
                             alt="front"/>
                    </div>
                    <div className="coin_image coin_img_back">
                        <img src={card.reverseImageLink}
                             alt="back"/>
                    </div>
                </div>
                <div className="coin_about">
                    <h1 className="coin_title">{card.name}</h1>
                    <div className="coin_info">
                        {card.longDescription}
                    </div>
                    <table className="coin_table">
                        <tr>
                            <td>Issuing Country</td>
                            <td className="country">{card.country}</td>
                        </tr>
                        <tr>
                            <td>Composition</td>
                            <td className="Composition">{card.metal}</td>
                        </tr>
                        <tr>
                            <td>Quality</td>
                            <td className="quality">{card.quality}</td>
                        </tr>
                        <tr>
                            <td>Denomination</td>
                            <td className="denomination">{card.faceValue}</td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td className="year">{card.year}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td className="weight">{card.weight} gr.</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td className="price">{card.price}$</td>
                        </tr>
                    </table>
                    <a href="#" className="coin_back" onClick={e => {e.preventDefault();goList()}}>Back to the list</a>
                </div>
            </div>
        </div>);
};

export default Coin;