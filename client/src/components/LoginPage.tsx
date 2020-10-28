import React from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { logIn } from "../reducers/userSlice";

//Denne komponenten viser login siden eller en mld om at brukeren er logget inn
export const LoginPage = () => {
  
  //redux funksjonene som henter state fra store og kjører dispacth, som trigger en endring i state
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootStateOrAny) => state.loggedIn)
    .value;

  const onLoginButtonClicked = () => {
    dispatch(logIn());
  };

  /*renderPage() bestemmer om brukerinnloggingsfeltene skal vises eller om en mld om at brukeren er logget inn skal vises*/
  const renderPage = () => {
    if (isLoggedIn === false) {
      return (
        <div className={"login-section"}>
          <h2 className={"login-page-title"}>Logg inn</h2>
          <form className={"login-page-form"}>
            <div className={"form-group username"}>
              <label className={"input-label"} htmlFor={"username"}>
                Brukernavn
              </label>
              <input
                name={"username"}
                className={"input"}
                autoFocus
                placeholder={"OlaNormann"}
              />
            </div>

            <div className={"form-group password"}>
              <label className={"input-label"} htmlFor={"password"}>
                Passord
              </label>
              <input
                name={"password"}
                className={"input"}
                type={"password"}
                autoFocus
                placeholder={"Passord"}
              />
            </div>

            <div className={"form-group"}></div>
            <button
              className={"login-button"}
              type={"submit"}
              onClick={onLoginButtonClicked}
            >
              Logg inn
            </button>
          </form>
        </div>
      );
    }
    if (isLoggedIn) {
      return (
        <div>
          You have been logged in! you can now like and store your favorite
          films{" "}
        </div>
      );
    }
  };

  return <div className={"login-page"}>{renderPage()}</div>;
};

export default LoginPage;
