import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { AppState } from "../reducers/Reducer";
import { set_username } from "../reducers/Actions";
import { LoginForm } from "./LoginForm";
import HttpClient from "../modules/HttpClient";
import { LocalStorage } from "../modules/Storage";
import { User } from "../types/DatabaseTypes";
import { Loader } from "semantic-ui-react";

type SubmitState = {
    status: "none" | "waiting" | "success" | "failure";
    errorMessage: string;
};

// Denne komponenten viser login-siden, eller en melding om at brukeren er logget inn
export const LoginPage = () => {
    //redux-funksjonene som henter state fra store og kjører dispacth, som trigger en endring i state
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: AppState) => state.loggedIn);

    // Create a state with the content of the username input
    const [userInput, setUserInput] = useState<string>("");

    const [submitState, setSubmitState] = useState<SubmitState>({
        status: "none",
        errorMessage: "",
    });

    // Update state when the username input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    // Attempt to log in on submit
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = HttpClient.loginOrCreateUser(userInput);
        setSubmitState({ status: "waiting", errorMessage: "" });
        result
            .then(() => {
                setSubmitState({ status: "success", errorMessage: "" });
                // Store username in local storage
                LocalStorage.set("username", userInput);
                // Update redux with username
                dispatch(set_username(userInput));
            })
            .catch((error) => {
                setSubmitState({
                    status: "failure",
                    errorMessage: error.message,
                });
                // Handle error
                console.error(error);
            });
    };

    /*renderPage() bestemmer om brukerinnloggingsfeltene skal vises, eller om det skal vises en melding om at brukeren er logget inn.*/
    const renderPage = () => {
        if (isLoggedIn) {
            return (
                <div>
                    <p>
                        You have been logged in! You can now like and store your
                        favorite films
                    </p>
                </div>
            );
        } else {
            if (submitState.status === "none") {
                return (
                    <LoginForm
                        userInput={userInput}
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                    />
                );
            } else if (submitState.status === "waiting") {
                return <Loader active inline={"centered"} />;
            } else if (submitState.status === "failure") {
                return (
                    <div>
                        <p>Login failed: {submitState.errorMessage}</p>
                        <LoginForm
                            userInput={userInput}
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                );
            } else if (submitState.status === "success") {
                return (
                    <LoginForm
                        userInput={userInput}
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                    />
                );
            }
        }
    };

    return <div className={"login-page"}>{renderPage()}</div>;
};

export default LoginPage;
