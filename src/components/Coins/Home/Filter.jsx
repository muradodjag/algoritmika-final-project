import React, {useEffect, useState, useContext} from 'react';
import {observer} from "mobx-react-lite";
import Arrow from "../../../assets/img/arrow.svg";
import {Context} from "../../../index";
import Snackbar from "../../Utils/Snackbar";
import {CoinCategories, CoinFilters} from "../../../utils/consts";

const Filter = () => {

    const {main} = useContext(Context)
    const [active, setActive] = useState(false)
    const [filters, setFilters] = useState({country: [], quality: [], metal: [], category: []})
    const [showMessage, setShowMessage] = useState(false)


    const closeSnackbar = () => {
        setShowMessage(false)
    }

    useEffect(() => {
        const updateFilters = async () => {
            const mFilters = await main.filters()
            if (main.isError) {
                setShowMessage(true)
                return
            }
            //Init filters state
            Object.keys(mFilters).forEach(
                objKey => {
                    mFilters[objKey].unshift('')
                }
            )
            setFilters(mFilters)
        }
        updateFilters().catch(console.error)
        main.setError('')

    }, [])

    return (
        <div className="filter">
            <Snackbar
                show={showMessage}
                message={main.isError}
                closeSnackbar={closeSnackbar}
            />
            <a
                href="#"
                className="filter_click"
                onClick={() => {
                    setActive(!active)
                }}
            >
                <div className="filter_text">Advanced filter</div>
                <div className="filter_arrow">
                    <img src={Arrow} alt="arrow"/>
                </div>
            </a>
            <div className={active ? "filter_content active" : "filter_content"}>
                <form className="filter_form">
                    {
                        CoinFilters.map((Item => {
                            return (
                                <div key={Item.id} className="filter_field">
                                    <label className="filter_field_name" htmlFor={Item.name}
                                    >{Item.label}</label
                                    >
                                    <select
                                        name={Item.name}
                                        id={Item.id}
                                        className="filter_select"
                                        onChange={e => main.setFilterByField(e.target.value, e.target.name)}
                                        value={
                                            Item.name === 'category'
                                                ? CoinCategories.find(Obj => Obj.id == main.Filters[Item.name])?.name
                                                : main.Filters[Item.name]
                                        }
                                    >
                                        {filters[Item.name].map((Elem) => {
                                            return (
                                                <option key={Elem}>
                                                    {Item.name === 'category' ? CoinCategories.find(Obj => Obj.id == Elem)?.name : Elem}
                                                </option>)
                                        })}
                                    </select>
                                </div>
                            )
                        }))
                    }
                    <div className="filter_field price">
                        <div className="filter_field_name">Price</div>
                        <div className="filter_field_wrap">
                            <label
                                className="filter_field_subname"
                                htmlFor="price_from"
                            >from</label
                            >
                            <input
                                id="price_from"
                                type="text"
                                name="name"
                                className="filter_input"
                                value={main.priceFromFilter}
                                onChange={e => main.setPriceFilter(e.target.value, main.priceToFilter)}
                            />
                            <label
                                className="filter_field_subname"
                                htmlFor="price_to"
                            >to</label
                            >
                            <input
                                id="price_to"
                                type="text"
                                name="price_to"
                                className="filter_input"
                                value={main.priceToFilter}
                                onChange={e => main.setPriceFilter(main.priceFromFilter, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="filter_field year">
                        <div className="filter_field_name">
                            Year of issue
                        </div>
                        <div className="filter_field_wrap">
                            <label
                                className="filter_field_subname"
                                htmlFor="year_from"
                            >from</label
                            >
                            <input
                                id="year_from"
                                type="number"
                                name="year_from"
                                className="filter_input"
                                value={main.yearFromFilter}
                                onChange={e => main.setYearFilter(e.target.value, main.yearToFilter)}
                            />
                            <label
                                className="filter_field_subname"
                                htmlFor="year_to"
                            >to</label
                            >
                            <input
                                id="year_to"
                                type="number"
                                name="price_to"
                                className="filter_input"
                                value={main.yearToFilter}
                                onChange={e => main.setYearFilter(main.yearFromFilter, e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default observer(Filter);