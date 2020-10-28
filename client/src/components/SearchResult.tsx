import React, {Component} from 'react';
import ResultTableAccordion from "./ResultTableAccordion";
import {Movie} from "../types/DatabaseTypes";
import HttpClient from "../modules/HttpClient";

interface Props {

}

interface State {
    movies: Movie[];
}



class SearchResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {movies: [{tconst: "1",
                title_type: "Movie",
                primary_title: "Birds",
                original_title: "Fuglane",
                is_adult: false,
                end_year: null,
                start_year: 1847,
                runtime_minutes: 145,
                genres: "comedy, horror",},{tconst: "1",
                title_type: "Movie",
                primary_title: "Birds",
                original_title: "Fuglane",
                is_adult: false,
                end_year: null,
                start_year: 1847,
                runtime_minutes: null,
                genres: null,
                liked: true,},
                {tconst: "2",
                    title_type: "TV-series",
                    primary_title: "Birds",
                    original_title: "Fuglane",
                    is_adult: true,
                    end_year: 2001,
                    start_year: 1984,
                    runtime_minutes: 40,
                    genres: "comedy, thriller",
                    liked: false,}]}
    }

    render() {
        return (
            <div className={"search-result"}>
                <h2>Søkeresultat:</h2>
                <ResultTableAccordion movies={this.state.movies}/>
            </div>

        )
    }

    // Search() tek inn argument for kva det skal søkast etter.
    // Spør databasen.
    // Basert på resultat vert state til SearchResult sett.
    // Skal kallast av søkeknappen i SearchBar
    search(searchInput:string) {
        // ta inn argument:

        /* Kommunikasjon med database */
        // Set opp kopling mot databasen
        const baseURL = "http://it2810-22.idi.ntnu.no:3000";
        const client = new HttpClient(baseURL);

        // Spør databasen
        const result = client.searchMovies({title: searchInput});


        // Sett state hos SearchResult
        result.then((response) => {this.setState({movies: response});});
    };


}

export default SearchResult;

