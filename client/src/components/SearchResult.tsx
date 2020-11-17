import React, { Component } from "react";
import SearchResultTable from "./SearchResultTable";
import { Movie } from "../types/DatabaseTypes";
import { Loader } from "semantic-ui-react";

/*
 * searchStatus beskriver tilstanden til søket
 * errorMessage inneholder feilmelding fra HttpClient
 * movies inneholder resultatene av søk
 * searchInput er strengen som ble søkt på
 */
interface Props {
    searchStatus: "none" | "waiting" | "success" | "failure";
    errorMessage: null | string;
    movies: Movie[];
    searchInput: string | null;
}

/*
 * Klassen SearchResult får inn props fra SearchPage,
 * og rendrer resultater/feilmeldinger deretter.
 */
class SearchResult extends Component<Props> {
    render() {
        // Dersom det ikkje er søkt på noko ennå vert det returnert og rendra ein tom div
        if (this.props.searchStatus === "none") {
            return <div className={"search-result nothing-searched"} />;
        }
        // Display spinner if waiting
        else if (this.props.searchStatus === "waiting") {
            return (
                <div className={"result-loader"}>
                    <Loader active inline={"centered"} />
                </div>
            );
        }
        // Dersom det er søkt på noko vert resultatet returnert og rendra
        else if (this.props.searchStatus === "success") {
            // Empty response = no results for give search input
            if (this.props.movies.length === 0) {
                return (
                    <div className={"no-result"}>
                        <p>No result for "{this.props.searchInput}"</p>
                    </div>
                );
            }
            // Render results
            else {
                return (
                    <div className={"search-result"}>
                        <h3>Søkeresultat:</h3>
                        <SearchResultTable movies={this.props.movies} />
                    </div>
                );
            }
        }
        // On failure, display error message
        else if (this.props.searchStatus === "failure") {
            //TODO: Style this?
            return <p>{this.props.errorMessage}</p>;
        }
    }
}

export default SearchResult;
