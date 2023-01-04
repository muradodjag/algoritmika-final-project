import React from 'react';
import {observer} from "mobx-react-lite";

const Search = ({main, onClick}) => {
    return (
        <form className="coin_search">
            <label className="name_label label" htmlFor="name">Input field</label>
            <input className="input" id="name" type="text" name="name"
                   onChange={e => main.setSearch(e.target.value)}
                   value={main.Search}
            />
            <button
                className="button submit"
                onClick={e => {
                    e.preventDefault()
                    main.setPage(0)
                    onClick()
                }}
            >Search</button>
        </form>
    );
};

export default observer(Search);