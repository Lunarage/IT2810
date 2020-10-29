import React, { Component } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import Menu from "./Menu";

//Denne komponenten viser banneret helt øverst på siden med Logo og hvem som er logget inn
const Banner = (props: Props) => {
  const loggedIn = useSelector((state: RootStateOrAny) => state.loggedIn).value;
  const username = useSelector((state: RootStateOrAny) => state.loggedIn)
    .username;

  const loginInfo = (loggedIn: boolean, username: string) => {
    console.log(loggedIn, username);
    if (loggedIn) {
      return (
        <div className={"banner-login"}>
          <p className="login-info">Logged in as</p>
          <p className="login-info-username">{username}</p>
        </div>
      );
    }
  };

  return (
    <div className={"banner"}>
      <h1 className={"logo"} onClick={props.onLogoClick}>
        Logo
      </h1>
      {loginInfo(loggedIn, username)}
    </div>
  );
};

export default Banner;

interface Props {
  onLogoClick(): void;
}
