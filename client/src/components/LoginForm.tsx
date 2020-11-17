import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { toggle_loggedIn, set_username } from "../reducers/Actions";
interface Props {
    userInput: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginForm = (props: Props) => {
    
    const dispatch = useDispatch();

    const onLogInButtonClicked = () => {
        dispatch(toggle_loggedIn(true));
        dispatch(set_username(props.userInput))
    };

    return (
        <div className={"login-section"}>
            <h2 className={"login-page-title"}>Log in</h2>
            <form className={"login-page-form"} onSubmit={props.handleSubmit}>
                <div className={"form-group username"}>
                    <label className={"input-label"} htmlFor={"username"}>
                        Username
                    </label>
                    <input
                        name={"username"}
                        className={"input"}
                        value={props.userInput}
                        autoFocus
                        placeholder={"OlaNordmann"}
                        onChange={props.handleInputChange}
                        pattern={"[a-zA-Z0-9]{3,}"}
                        title={"At least 3 characters: a-z, A-Z, 0-9."}
                        required
                    />
                </div>

                <div className={"form-group password"}>
                    <label className={"input-label"} htmlFor={"password"}>
                        Password
                    </label>
                    <input
                        name={"password"}
                        className={"input"}
                        type={"password"}
                        placeholder={"Password"}
                        disabled
                    />
                </div>

                <div className={"form-group"} />
                <button className={"login-button"} type={"submit"} >
                    Log in
                </button>
            </form>
        </div>
    );
};
