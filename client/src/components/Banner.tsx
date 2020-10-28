import React, {Component} from 'react';
import Menu from "./Menu";

//Denne komponenten viser banneret helt øverst på siden med Logo og hvem som er logget inn
class Banner extends Component<Props, State> {
    render() {
        return (
            <div className={"banner"}>
                <h1 className={"logo"} onClick={this.props.onLogoClick}>Logo</h1>
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

interface Props{
    onLogoClick(): void
 }

 interface State {

 }