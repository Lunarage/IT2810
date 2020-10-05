import React, {Component} from "react";
import SearchBar from "./SearchBar";


class Start extends Component<{}, {}> {
    render() {
        return (
            <div className={"start"}>
                <SearchBar/>
            </div>
        );
    }

}

export default Start;