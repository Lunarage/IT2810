import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchNavigation from "./SearchNavigation";

class SearchPage extends Component<{}, {}> {
    render() {
        return (
            <div className={"search-page"}>
                <SearchBar/>
                <SearchResult/>
                <SearchNavigation/>
            </div>

        )
    }


}

export default SearchPage;