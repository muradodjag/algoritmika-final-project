import React, {useEffect} from 'react';
import '../../styles/snackbar.css'

const Snackbar = ({show, message, closeSnackbar}) => {

    useEffect(() =>{
        if(show) setTimeout( closeSnackbar, 3000);
    }, [show])

    return (
        <div id="snackbar"
             className={show ? 'show' : ''}
        >
            {message ? message : 'Error occured!'}
        </div>
    );
};

export default Snackbar;