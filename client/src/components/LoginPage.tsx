import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { logIn } from "../reducers/userSlice";
import { LoginForm } from "./LoginForm";
import HttpClient from "../modules/HttpClient";
import { SessionStorageWrapper, LocalStorageWrapper } from "../modules/Storage";
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
    const isLoggedIn = useSelector((state: RootStateOrAny) => state.loggedIn)
        .value;

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
        const baseURL = "http://it2810-22.idi.ntnu.no:3000";
        const client = new HttpClient(baseURL);
        const result = client.createUser(userInput);
        setSubmitState({ status: "waiting", errorMessage: "" });
        result
            .then((response) => {
                setSubmitState({ status: "success", errorMessage: "" });
                if (response.length > 0) {
                    // New user
                    const user = response[0];
                } else {
                    // Existing user
                }
                const localStorage = new LocalStorageWrapper();
                localStorage.set("username", userInput);
                // Update redux with username
                dispatch(logIn(userInput));
            })
            .catch((error) => {
                setSubmitState({
                    status: "failure",
                    errorMessage: error.message,
                });
                // Handle error
                console.log(error);
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
