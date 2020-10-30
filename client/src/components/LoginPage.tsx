import React, { useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { logIn } from "../reducers/userSlice";

//Denne komponenten viser login siden eller en mld om at brukeren er logget inn
export const LoginPage = () => {
  //redux funksjonene som henter state fra store og kjører dispacth, som trigger en endring i state
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

  /*renderPage() bestemmer om brukerinnloggingsfeltene skal vises eller om en mld om at brukeren er logget inn skal vises*/
  const renderPage = () => {
    if (isLoggedIn === false) {
      return (
        <div className={"login-section"}>
          <h2 className={"login-page-title"}>Log in</h2>
          <form className={"login-page-form"} onSubmit={handleSubmit}>
            <div className={"form-group username"}>
              <label className={"input-label"} htmlFor={"username"}>
                Username
              </label>
              <input
                name={"username"}
                className={"input"}
                value={userInput}
                autoFocus
                placeholder={"Ola Nordmann"}
                onChange={handleInputChange}
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

            <div className={"form-group"}></div>
            <button className={"login-button"} type={"submit"}>
              Log in
            </button>
          </form>
        </div>
      );
    }
    if (isLoggedIn) {
      return (
        <div>
          <p>You have been logged in! You can now like and store your favorite
          films{" "}</p>
        </div>
      );
    }
  };

  return <div className={"login-page"}>{renderPage()}</div>;
};

export default LoginPage;
