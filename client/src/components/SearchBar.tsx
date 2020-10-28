import React, {Component} from 'react';

class SearchBar extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-bar"}>
                <input className={"search-input"} name={"search"} type={"search"} autoFocus placeholder={"Søk i database"}/>
                <button className={"search-button"}>Søk</button>
            </div>

        )
    }





}

export default SearchBar;