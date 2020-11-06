import React, { useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { logIn } from "../reducers/userSlice";
import { LoginForm } from "./LoginForm";

// Denne komponenten viser login-siden, eller en melding om at brukeren er logget inn
export const LoginPage = () => {
    //redux-funksjonene som henter state fra store og kjører dispacth, som trigger en endring i state
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.loggedIn)
        .value;

    // Create a state with the content of the username input
    const [userInput, setUserInput] = useState<string>("");

    // Update state when the username input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    // Let redux handle the login function on submit
    const handleSubmit = () => {
        dispatch(logIn(userInput));
    };

    /*renderPage() bestemmer om brukerinnloggingsfeltene skal vises, eller om det skal vises en melding om at brukeren er logget inn.*/
    const renderPage = () => {
        if (isLoggedIn === false) {
            return (
                <LoginForm userInput={userInput} handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
            );
        }
        if (isLoggedIn) {
            return (
                <div>
                    <p>You have been logged in! You can now like and store your favorite
                        films</p>
                </div>
            );
        }
    };

    return <div className={"login-page"}>{renderPage()}</div>;
};

export default LoginPage;
