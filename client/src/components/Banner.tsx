import React, {Component} from 'react';
import Menu from "./Menu";

class Banner extends Component<{}, {}> {
    render() {
        return (
            <div className={"banner"}>
                <h1 className={"logo"}>Logo</h1>
                {/* TODO Add logic for checking/displaying button and "logged in as" based on if user is logged in. */}
                <div className={"banner-login"}>
                    <p className={"login-info"}>{"Logged in as"}</p> <p className={"login-info-username"}>{"username"}</p>
                    {/*Todo get username*/}
                </div>
            </div>

        )
    }


}

export default Banner;