import React, { Component } from "react";
import ResultTableAccordion from "./ResultTableAccordion";
import { Movie } from "../types/DatabaseTypes";
import HttpClient from "../modules/HttpClient";
import { Loader } from "semantic-ui-react";

interface Props {
    searchInput: string | null;
    titleType: string | null;
    orderDir: string | null;
    page: number;
    username: string;
}

interface State {
    searchStatus: "none" | "waiting" | "success" | "failure";
    errorMessage: null | string;
    movies: Movie[];
}

/* Klassen SearchResult får inn en streng searchInput fra SearchPage, gjør et søk i databasen på strengen.
Derretter kalles ResultTableAccordon med prop movies = this.state.movies.
 */
class SearchResult extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            searchStatus: "none",
            errorMessage: null,
            movies: [
                {
                    // "Dummie-data" som vises når det søkes etter resultat for å unngå tom tabell.
                    tconst: "-1",
                    title_type: "This is a placeholder for real data.",
                    primary_title: "Waiting for result",
                    original_title: "",
                    is_adult: false,
                    end_year: null,
                    start_year: 0,
                    runtime_minutes: null,
                    genres: null,
                    liked: false,
                },
            ],
        };

        this.search = this.search.bind(this);

        if (
            this.props.searchInput != null &&
            this.props.orderDir != null &&
            this.props.titleType != null &&
            this.props.page != null
        ) {
            this.search(
                this.props.searchInput,
                this.props.titleType,
                this.props.orderDir,
                this.props.page
            );
        }
    }

    render() {
        // Dersom det ikkje er søkt på noko ennå vert det returnert og rendra ein tom div
        if (this.state.searchStatus === "none") {
            return <div className={"search-result nothing-searched"} />;
        }
        // Dersom det er søkt på noko vert resultatet returnert og rendra
        else if (this.state.searchStatus === "waiting") {
            return (
                <div className={"result-loader"}>
                    <Loader active inline={"centered"} />
                </div>
            );
        } else if (this.state.searchStatus === "success") {
            if (this.state.movies.length === 0) {
                return (
                    <div className={"no-result"}>
                        <p>No result for "{this.props.searchInput}"</p>
                    </div>
                );
            } else {
                return (
                    <div className={"search-result"}>
                        <h3>Søkeresultat:</h3>
                        <ResultTableAccordion movies={this.state.movies} />
                    </div>
                );
            }
        } else if (this.state.searchStatus === "failure") {
            //TODO: Style this
            return <p>{this.state.errorMessage}</p>;
        }
    }

    // Search() tek inn argument for kva det skal søkast etter.
    // Spør databasen.
    // Basert på resultat vert state til SearchResult sett.
    // Skal kallast av søkeknappen i SearchBar
    search(
        searchInput: string,
        titleType: string,
        orderDir: string,
        page: number
    ) {
        // Kommunikasjon med database
        // Set opp kopling mot databasen
        const baseURL = "http://it2810-22.idi.ntnu.no:3000";
        const client = new HttpClient(baseURL);

        // Spør databasen
        const result = client.searchMovies({
            title: searchInput,
            titleType: titleType,
            orderBy: "start_year",
            orderDir: orderDir,
            username: this.props.username,
            page: page,
        });

        this.setState({ searchStatus: "waiting" });

        // Sett state hos SearchResult
        result
            .then((response) => {
                this.setState({ movies: response, searchStatus: "success" });
            })
            .catch((error) => {
                // TODO: Print error type
                this.setState({
                    searchStatus: "failure",
                    errorMessage: error.message,
                });
            });
    }
}

export default SearchResult;
