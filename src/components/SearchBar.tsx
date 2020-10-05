import React, {Component} from 'react';

class SearchBar extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-bar"}>
                <input name={"search"} type={"search"} autoFocus placeholder={"Søk i database"}/>
                <button>Søk</button>
            </div>

        )
    }


}

export default SearchBar;