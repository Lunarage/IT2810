import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import NavigateResults from "./NavigateResults";

class SearchPage extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-page"}>
                <SearchBar/>
                <SearchResult/>
                <NavigateResults/>
            </div>

        )
    }


}

export default SearchPage;