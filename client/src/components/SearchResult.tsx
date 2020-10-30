import React, {Component} from "react";
import ResultTableAccordion from "./ResultTableAccordion";
import {Movie} from "../types/DatabaseTypes";
import HttpClient from "../modules/HttpClient";


interface Props {
    searchInput: string | null;
    titleType: string | null;
    orderDir: string | null;
    username: string;
}

interface State {
    movies: Movie[];
}

/* Klassen SearchResult får inn en streng searchInput fra SearchPage, gjør et søk i databasen på strengen.
Derretter kalles ResultTableAccordon med prop movies = this.state.movies.
 */
class SearchResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            movies: [
                {
                    // "Dummie-data" som vises når det søkes etter resultat for å unngå tom tabell.
                    tconst: "1",
                    title_type: "",
                    primary_title: "Waiting for result",
                    original_title: "",
                    is_adult: false,
                    end_year: null,
                    start_year: 0,
                    runtime_minutes: null,
                    genres: null,
                },
            ],
        };

        this.search = this.search.bind(this);

        if (
            this.props.searchInput != null &&
            this.props.orderDir != null &&
            this.props.titleType != null
        ) {
            this.search(
                this.props.searchInput,
                this.props.titleType,
                this.props.orderDir
            );
        }
    }

    render() {
        // Dersom det ikkje er søkt på noko ennå vert det returnert og rendra ein tom div
        if (this.props.searchInput == null) {
            return (
                <
                    div
                    className={"search-result no-search-result"}
                />
            )
        }

// Dersom det er søkt på noko vert resultatet returnert og rendra
        else {
            return (
                <div className={"search-result"}>
                    <h3>Søkeresultat:</h3>
                    <ResultTableAccordion movies={this.state.movies}/>
                </div>
            )
        }
    }

// Search() tek inn argument for kva det skal søkast etter.
// Spør databasen.
// Basert på resultat vert state til SearchResult sett.
// Skal kallast av søkeknappen i SearchBar
    search(searchInput: string, titleType: string, orderDir: string) {
        /* Kommunikasjon med database */
        // Set opp kopling mot databasen
        const baseURL = "http://it2810-22.idi.ntnu.no:3000";
        const client = new HttpClient(baseURL);

        // Spør databasen
        const result = client.searchMovies({
            title: searchInput,
            titleType: titleType,
            orderBy: "start_year",
            orderDir: orderDir,
        });

        // Sett state hos SearchResult
        result.then((response) => {
            this.setState({movies: response});
        });
    }
}

export default SearchResult;
