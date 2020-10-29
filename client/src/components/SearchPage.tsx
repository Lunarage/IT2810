import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchNavigation from "./SearchNavigation";
import HttpClient from "../modules/HttpClient";
import {Movie} from "../types/DatabaseTypes";

interface Props {

}

interface State {
    searchInput: string | null;
}


class SearchPage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            searchInput: null,
        }
        this.searchButtonClicked = this.searchButtonClicked.bind(this);
    }

    render() {
        return (
            <div className={"search-page"}>
                <SearchBar searchButtonClicked={this.searchButtonClicked}/>
                <SearchResult searchInput={this.state.searchInput} key={this.state.searchInput}/>       {/* Om key vert endra vil det opprettast ein ny instans av SearchResult, som køyrer SearchResult.search i konstruktøren sin.*/}
                <SearchNavigation/>
            </div>

        )
    }

    searchButtonClicked(input: string) {
        console.log("searchButtonClicked called in searchPage")
        this.setState({searchInput: input});
    }


}

export default SearchPage;