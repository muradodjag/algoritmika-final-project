import React, {useContext, useEffect, useState} from 'react';
import '../App.css'
import {useNavigate, useParams} from "react-router-dom";
import {ADMIN_LIST_ROUTE, CoinCategories} from "../utils/consts";
import Loader from "../components/Utils/Loader";
import Error404 from "../components/Utils/Error404";
import Snackbar from "../components/Utils/Snackbar";
import {Context} from "../index";

const Edit = () => {

    const params = useParams()
    const isNew = !params?.id
    const navigate = useNavigate()

    const {main} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const [card, setCard] = useState({
        category: CoinCategories[0].id,
        name: "",
        faceValue: "",
        year: "",
        price: "",
        country: "",
        metal: "",
        shortDescription: "",
        longDescription: "",
        quality: "",
        weight: "",
        obverseImageLink: "",
        reverseImageLink: ""
    })

    const closeSnackbar = () => {
        setShowMessage(false)
    }

    const goBack = () =>{
        navigate(ADMIN_LIST_ROUTE)
    }

    const saveResult = async () => {

        if(isNew) {
            await main.newCoin(card)
        }else{
            await main.updateCoin(params.id, card)
        }

        if (main.isError) {
            setShowMessage(true)
            return
        }

        navigate(ADMIN_LIST_ROUTE)

    }

    const updateCard = async () => {

        if(isNew) {
            setIsLoading(false)
            return
        }
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

    const handleChange = (e) => {
        let mValue = ''
        if (e.target.name === 'category') {
            mValue = CoinCategories.find(Obj => Obj.name === e.target.value)?.id
        } else {
            mValue = e.target.value
        }
        setCard(prevState => ({...prevState, [e.target.name]: mValue}))
    }

    if (isLoading) return (<Loader/>)

    if (!card && !isLoading) {
        return (<Error404/>)
    }

    return (
        <div>
            <Snackbar
                show={showMessage}
                message={main.isError}
                closeSnackbar={closeSnackbar}
            />
            <header><h1>Admin panel</h1></header>
            <section>
                <div className="coin_add">
                    <div className="coin_add_column">
                        <label className="add_label label" htmlFor='category'>Category</label>
                        <select
                            name='category'
                            id='category'
                            className="filter_select"
                            onChange={e => handleChange(e)}
                            value={CoinCategories.find(Obj => Obj.id === card.category)?.name}
                        >
                            {CoinCategories.map((Elem) => {
                                return (
                                    <option key={Elem.id}>
                                        {Elem.name}
                                    </option>)
                            })}
                        </select>
                        <label className="add_label label" htmlFor="name">Coin name</label>
                        <input className="input" id="name" type="text" name="name" value={card.name}
                               onChange={e => handleChange(e)}/>
                        <label className="add_label label" htmlFor="value">Face value</label>
                        <input className="input" id="value" type="text" name="faceValue" value={card.faceValue}
                               onChange={e => handleChange(e)}/>
                        <label className="add_label label" htmlFor="year">Year of issue</label>
                        <input className="input" id="year" type="number" name="year" value={card.year}
                               onChange={e => handleChange(e)}/>
                        <label className="add_label label" htmlFor="price">Price</label>
                        <input className="input" id="price" type="number" name="price" value={card.price}
                               onChange={e => handleChange(e)}/>
                        <label className="add_label label" htmlFor="country">Country</label>
                        <input className="input" id="country" type="text" name="country" value={card.country}
                               onChange={e => handleChange(e)}/>
                        <label className="add_label label" htmlFor="metal">Metal</label>
                        <input className="input" id="metal" type="text" name="metal" value={card.metal}
                               onChange={e => handleChange(e)}/>
                    </div>
                    <div className="coin_add_column">

                        <label className="add_label label" htmlFor="s_desc">Short description</label>
                        <textarea className="input textarea" id="s_desc" type="text" maxLength="200"
                                  name="shortDescription" value={card.shortDescription}
                                  onChange={e => handleChange(e)}/>

                        <label className="add_label label" htmlFor="l_desc">Long description</label>
                        <textarea className="input textarea" id="l_desc" type="text" maxLength="600"
                                  name="longDescription" value={card.longDescription} onChange={e => handleChange(e)}/>

                        <label className="add_label label" htmlFor="quality">Quality of the coin</label>
                        <input className="input" id="quality" type="text" name="quality" value={card.quality}
                               onChange={e => handleChange(e)}/>

                        <label className="add_label label" htmlFor="weight">Weight</label>
                        <input className="input" id="weight" type="number" name="weight" value={card.weight}
                               onChange={e => handleChange(e)}/>
                    </div>
                    <div className="coin_add_column">
                        <label className="add_label label" htmlFor="obverse">Link to obverse image</label>
                        <input className="input" id="obverse" type="text" name="obverseImageLink"
                               value={card.obverseImageLink} onChange={e => handleChange(e)}/>
                        <label className="add_label label" htmlFor="reverse">Link to reverse image</label>
                        <input className="input" id="reverse" type="text" name="reverseImageLink"
                               value={card.reverseImageLink} onChange={e => handleChange(e)}/>
                        <div className="coin_add_btns">
                            <button
                                className="button coin_add_btn save"
                                onClick={saveResult}
                            >Save
                            </button>
                            <button
                                className="button coin_add_btn cancel"
                                onClick={goBack}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Edit;