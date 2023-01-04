import React from 'react';
import {useNavigate} from "react-router-dom";
import '../../styles/error404.css'
const Error404 = () => {

    const navigate = useNavigate()

    return (
        <div>
            <title>Page Not Found</title>
            <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif"/>
                <h1 className="error-text">Whoops, We can't seem to find the resource you're looking for.</h1>
                <p className="text">Please check that the Web site address is spelled correctly.Or,</p>
                <div className="btn1">
                    <a className="error" href="#"
                       onClick={e => {e.preventDefault();navigate('/')}}
                    >Go to
                        Homepage</a>
                </div>
        </div>
);
};

export default Error404;