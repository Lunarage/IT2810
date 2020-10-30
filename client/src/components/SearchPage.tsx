import React, {Component, useState} from 'react';
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import SearchNavigation from "./SearchNavigation";
import {RootStateOrAny, useSelector} from "react-redux";

interface Props {

}

interface State {
    searchInput: string | null;
}

/* SearchPage har tilstanden (state) searchInput som mottar en streng fra SearchBar når input sendes inn der ("search").
* SearchInput sendes som prop til SearchResult, og brukes der til å hente søkeresultat.
* searchButtonClicked sendes til SearchBar, og kalles når det trykkes "search" der.
* Rendrer SearchBar (inputfelt + button) og SearchResult (overskrift + ResultTableAccordion)
* */
const SearchPage = (props: Props) => {

    const [state, setState] = useState<State>({
        searchInput: null, // om det ikke er søkt etter noe skal input være null
    })

    const username = useSelector((state: RootStateOrAny) => state.loggedIn)
        .username;

    return (
        <div className={"search-page"}>
            <SearchBar searchButtonClicked={searchButtonClicked}/>
            <SearchResult searchInput={state.searchInput}
                          username={username}
                          key={state.searchInput}/> {/* Dersom key blir endret vil det opprettes en ny instans av SearchResult. SearchResult kjører search(searchInput)-funksjonen i konstruktøren sin. Slik sikrer vi at det kun søkes om skjemaet er sendt inn (og endret)*/}
            <SearchNavigation/>
        </div>
    )


    // Funksjon som kalles i SearchBar. Der sender den tekststrengen i inputfeltet "opp hit" hvor den blir satt til this.state.searchInput
    function searchButtonClicked(input: string) {
        setState({searchInput: input});
    }


}

export default SearchPage;
