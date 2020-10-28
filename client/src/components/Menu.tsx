import React, {Component, MouseEvent} from "react";

class Menu extends Component<Props, State> {


    render() {
        return (
            <div className={"menu"}>
                <a tabIndex={0} className="home-button" onClick={this.props.onHomePageClick}> [Hjem] </a>
                <a tabIndex={0} className="search-button" onClick={this.props.onSearchPageClick}>[Søk]</a>
                <a tabIndex={0} className="my-page-button" onClick={this.props.onMyPageClick}>[Min side]</a>
                <button className={"login-button"} onClick={this.props.onLoginPageClick}>Logg inn</button>
            </div>
        )
    }

}


export default Menu

interface Props {
    onHomePageClick(): void;

    onSearchPageClick(): void;

    onMyPageClick(): void;

    onLoginPageClick(): void;
}

interface State {

}