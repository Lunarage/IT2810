import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { AppState } from "../reducers/Reducer";

//Denne komponenten viser banneret helt øverst på siden med Logo og hvem som er logget inn
const Banner = (props: Props) => {
    const username = useSelector((state: AppState) => state.userName);

    const loginInfo = (username: string | null | undefined) => {
        if (username) {
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
            {loginInfo(username)}
        </div>
    );
};

export default Banner;

interface Props {
    onLogoClick(): void;
}
