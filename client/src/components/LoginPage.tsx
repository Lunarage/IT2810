import React from 'react';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux"
import { logIn, logOut } from "../reducers/userSlice"



export const LoginPage = () => {
        const dispatch = useDispatch()
        const isLoggedIn = useSelector((state: RootStateOrAny) => state.loggedIn).value

        const onLoginButtonClicked = () => {
            dispatch(logIn())
            console.log(isLoggedIn)
        }
        
        const onLogoutButtonClicked = () => {
            dispatch(logOut())
            console.log(isLoggedIn)
        }

        const renderPage = () => {
            console.log("Hei")
            console.log(isLoggedIn)
            if(isLoggedIn === false){
                return(
                <div className={"login-section"}>
                    <h2 className={"login-page-title"}>Logg inn</h2>
                    <form className={"login-page-form"}>
                        <div className={"form-group username"}>
                            <label className={"input-label"} htmlFor={"username"}>Brukernavn</label>
                            <input name={"username"} className={"input"} autoFocus placeholder={"OlaNormann"}/>
                        </div>
                        
                        <div className={"form-group password"}>
                            <label className={"input-label"} htmlFor={"password"}>Passord</label>
                            <input name={"password"} className={"input"} type={"password"} autoFocus
                                   placeholder={"Passord"}/>
                        </div>

                        <div className={"form-group"}>
                           
                        </div>
                        <button type={"submit"} onClick={onLoginButtonClicked}>Logg inn</button>
                    </form>
                </div>
                );}
            if(isLoggedIn === true){
                return(
                    <button type={"submit"} onClick={onLogoutButtonClicked}>Logg ut</button>
                );}
        }

        return (
            <div className={"login-page"} >
                {renderPage()}
            </div>

        );


}

export default LoginPage;