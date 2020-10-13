import React, {Component} from 'react';
import Menu from "./Menu";

class Banner extends Component<{}, {}> {
    render() {
        return (
            <div className={"banner"}>
                <h1 className={"logo"}>Logo</h1>
                {/* TODO Add logic for checking/displaying button and "logged in as" based on if user is logged in. */}
                <div className={"banner-login"}>
                    <p className={"login-info"}>{"Logged in as [Username]"}</p> {/*Todo get username*/}
                    {/* Todo: if logged in: "logg ut", else "logg in"*/}
                    {/*Todo: make login-button do stuff.*/}
                    <button className={"login-button"}>Logg inn</button>
                </div>
            </div>

        )
    }


}

export default Banner;