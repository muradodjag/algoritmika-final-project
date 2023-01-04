import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Snackbar from '../components/Utils/Snackbar'

//Importing styles
import '../App.css'
import {HOME_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

function Login() {

    const {user} = useContext(Context)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const navigate = useNavigate()

    async function loginUser() {
        await user.login(username, password)
        if (user.isError) {
            setShowMessage(true)
            return
        }
        setUsername('')
        setPassword('')
        user.setError('')
    }

    const closeSnackbar = () => {
        setShowMessage(false)
    }

    const goHome = () => {
        navigate(HOME_ROUTE)
    }

    return (
        <div>
            <Snackbar
                show={showMessage}
                message={user.isError}
                closeSnackbar={closeSnackbar}
            />
            <header>
                <div className="container">
                    <div className="flex">
                        <h1 className="pr10">Admin panel</h1>
                        <h1 className="pr10">|</h1>
                        <button
                            className="subtitle"
                            onClick={goHome}
                        >
                            <h1>Home</h1>
                        </button>
                    </div>
                </div>
            </header>
            <section className="auth">
                <form className="auth_forms">
                    <label className="login_label label" htmlFor="username">Login</label>
                    <input
                        className="input"
                        id="username"
                        type="text"
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <label className="password_label label" htmlFor="password">Password</label>
                    <input
                        className="input"
                        id="password"
                        type="password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        className="button sign"
                        onClick={(e) => {
                            e.preventDefault();
                            loginUser()
                        }}
                        disabled={!username}
                    >
                        Sign in
                    </button>
                </form>
            </section>
        </div>
    );

}

export default observer(Login)