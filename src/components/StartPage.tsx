import React, {Component} from "react";
import SearchBar from "./SearchBar";


class StartPage extends Component<{}, {}> {
    render() {
        return (
            <div className={"start-page"}>
                <SearchBar/>
            </div>
        );
    }

}

export default StartPage;